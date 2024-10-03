import { DiaryEntry, TableHeadData } from "./app-table.types";
import styles from './app-table.module.scss'
import { useEffect, useRef, useState } from "react";
import AppPopup, { IAppPopup } from "../app-popup/app-popup";

const electronicDiary: DiaryEntry[] = [
  { name: "Иванов Иван Иванович", grade: 5, absences: 0, attendance: 10, finalGrade: 5 },
  { name: "Петрова Мария Сергеевна", grade: 4, absences: 2, attendance: 8, finalGrade: 4 },
  { name: "Сидоров Алексей Петрович", grade: 3, absences: 5, attendance: 5, finalGrade: 3 },
  { name: "Кузнецова Елена Дмитриевна", grade: 5, absences: 1, attendance: 9, finalGrade: 5 },
  { name: "Васильев Виктор Николаевич", grade: 2, absences: 8, attendance: 2, finalGrade: 2 },
  { name: "Зайцев Михаил Владимирович", grade: 4, absences: 3, attendance: 7, finalGrade: 4 },
  { name: "Смирнова Ольга Андреевна", grade: 5, absences: 0, attendance: 10, finalGrade: 5 },
  { name: "Попов Артём Валерьевич", grade: 3, absences: 4, attendance: 6, finalGrade: 3 },
  { name: "Никитин Павел Александрович", grade: 2, absences: 7, attendance: 3, finalGrade: 2 },
  { name: "Фёдорова Анна Борисовна", grade: 4, absences: 2, attendance: 8, finalGrade: 4 }
];

const tableHeadData: TableHeadData[] = [
  { name: 'N', date: '' },
  { name: 'ФИО', date: '' },
  { name: 'Оценка', date: '2024-09-03' },
  { name: 'Пропуски', date: '2024-09-04' },
  { name: 'Присутствия', date: '2024-09-05' },
  { name: 'Итоговая оценка', date: '2024-09-06' },
]

const AppTable = () => {
  const [popupData, setPopupData] = useState<IAppPopup | null>(null);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const activeCellRef = useRef<HTMLTableCellElement  | null>(null);

  const handleClick = (entry: DiaryEntry, e: React.MouseEvent<HTMLTableCellElement>, colIndex: number) => {
    const target = e.target as HTMLTableCellElement;

    if (target.tagName === 'TD') {


      if (activeCellRef.current) {
        activeCellRef.current.classList.remove(styles.activeCell);
      }
      target.classList.add(styles.activeCell);
      activeCellRef.current = target;
      setIsOverlayActive(true)


      const rect = target.getBoundingClientRect();
      const currentCell = target.textContent || '';

      const currentDate = tableHeadData[colIndex].date

      setPopupData({
        popup: true,
        left: rect.right + window.scrollX + 200,
        top: rect.top + window.scrollY,
        arrowTop: (rect.height / 2) - 8,
        name: entry.name,
        currentCell,
        date: currentDate
      });
    }
  };

  const closePopup = () => {
    setPopupData(null);
    if(activeCellRef.current) {
      activeCellRef.current.classList.remove(styles.activeCell)
      setIsOverlayActive(false)
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const popupElement = document.getElementById('popup');
      if (popupElement && !popupElement.contains(event.target as Node)) {
        closePopup();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupData]);

  return (
    <div className={styles.table}>
      {isOverlayActive && <div className={styles.darkOverlay}></div>}
      <table>
        <thead>
          <tr>
            {tableHeadData.map((el, i) => (
              <th key={i}>{el.name} <span>{el.date && el.date}</span></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            electronicDiary.map((el, i) => (
              <tr key={i}>
                <td onClick={(e) => handleClick(el, e, 0)}>{i + 1}</td>
                {
                  Object.values(el).map((value, index) => (
                    <td key={index} onClick={(e) => handleClick(el, e, index + 1)}>
                      {value}
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
      <AppPopup properties={popupData}/>
    </div>
  )
}

export default AppTable