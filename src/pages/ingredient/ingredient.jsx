import IngredientDetails from "../../components/ingredients/ingredient-details/ingredient-details";
import AppWrapper from "../../components/app-wrapper/app-wrapper";
import { useSelector } from "react-redux";
import { store } from "../../store";
import { useParams } from "react-router-dom";

const IngredientInfo = () => {
  const params = useParams();
  const ingredients = useSelector(store => store.ingredients)
  // const imgredient = ingredients[_]
  return (
    <AppWrapper>
      {/*<IngredientDetails />*/}
      {params.id}
    </AppWrapper>
  );
};

export default IngredientInfo;
