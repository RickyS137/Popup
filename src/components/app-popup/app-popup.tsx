import { FC, useRef } from "react";
import styles from './app-popup.module.scss'


export interface IAppPopup {
  popup: boolean;
  left: number;
  top: number;
  arrowTop: number;
  currentCell: string;
  name: string;
  date: string;
}

const AppPopup: FC<{properties: IAppPopup | null}> = ({properties}) => {
  const popupRef = useRef<HTMLDivElement>(null)

  if(!properties) return null;
  
  const { popup, left, top, currentCell, name, date, arrowTop } = properties;

  return (
    popup && <div 
    ref={popupRef}
    id="popup"
    className={styles.popup}
    style={{
      left,
      top,
    }}
    >
      <div className={styles.arrow} style={{ top: arrowTop }}/>
      Значение ячейки: <strong>{currentCell}</strong><br />
      ФИО ученика: <strong>{name}</strong><br />
      Дата: <strong>{date}</strong>
    </div>
  )
}

export default AppPopup