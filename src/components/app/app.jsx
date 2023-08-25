import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../app-header/app-header";
import Ingredients from "../ingredients/ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useGetIngredientsQuery } from "../../store/api/ingredients/ingredients";
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
            <DndProvider backend={HTML5Backend}>
              <Ingredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        </>
      ) : null}
    </div>
  );
}
