import IngredientDetails from "../../components/ingredients/ingredient-details/ingredient-details";
import {useLoaderData} from "react-router-dom";

export default function IngredientInfo() {
  // const location = useLocation();
  const background = useLoaderData();
  // const { from } = location.state;
  console.log(background);

  return (
    <>
      <IngredientDetails />
    </>
  );
};
