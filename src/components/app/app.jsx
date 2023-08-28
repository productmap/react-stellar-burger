import { DndProvider } from "react-dnd-multi-backend";
import AppHeader from "../app-header/app-header";
import Ingredients from "../ingredients/ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useGetIngredientsQuery } from "../../store/api/burgers.api";
import { HTML5toTouch } from "../../utils/constants";
import styles from "./app.module.scss";

export default function App() {
  const {
    data: ingredients = [],
    isError,
    error,
    isLoading,
    isFetching,
  } = useGetIngredientsQuery();

  return (
    <div className={styles.app}>
      {isError ? (
        <>Произошла ошибка: {error}</>
      ) : isLoading || isFetching ? (
        <>Загрузка...</>
      ) : ingredients ? (
        <>
          <AppHeader />
          <main className={styles.main}>
            <DndProvider options={HTML5toTouch}>
              <Ingredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        </>
      ) : null}
    </div>
  );
}
