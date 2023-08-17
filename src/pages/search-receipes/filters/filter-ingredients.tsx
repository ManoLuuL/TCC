import { FC, useState } from "react";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { FiltersList, FiltersTitle, FiltersWrapper } from "./styles";
import { FiltersListProps } from "./types";
import { Divider } from "primereact/divider";
import { useReceipsService } from "../../../api/services";
import { useQuery } from "../../../globals/hooks/use-query";
import { Skeleton } from "primereact/skeleton";

const Filters: FC<FiltersListProps> = () => {
  const { getIngredientes } = useReceipsService();

  const { data: filtro, isLoading } = useQuery({
    query: async () => await getIngredientes(),
  });

  const [ingredients, setIngredients] = useState<string[]>([]);

  const onIngredientsChange = (e: CheckboxChangeEvent) => {
    let _ingredients = [...ingredients];

    if (e.checked) _ingredients.push(e.value);
    else _ingredients.splice(_ingredients.indexOf(e.value), 1);

    setIngredients(_ingredients);
  };

  return (
    <>
      {isLoading ? (
        <>
          <FiltersTitle>
            <Skeleton height="2rem" className="mb-2" width="12rem" />
          </FiltersTitle>

          {Array(8)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                height="2rem"
                className="mb-2"
                key={index}
                width="18rem"
              />
            ))}
        </>
      ) : (
        <>
          <FiltersWrapper>
            <FiltersTitle>Ingredientes</FiltersTitle>
            <FiltersList>
              {filtro &&
                filtro.map((data, index) => (
                  <div key={index}>
                    <Checkbox
                      checked={ingredients.includes(data.descricao)}
                      onChange={onIngredientsChange}
                      value={data.descricao}
                    />
                    <label className="m-1">
                      {data.descricao.toUpperCase()}
                    </label>
                  </div>
                ))}
            </FiltersList>

            <Divider />

            {/* <FiltersTitle>Restrições</FiltersTitle>
            <FiltersList>
              {restricoes.map((itens) => (
                <div key={itens.id} className="mb-1">
                  <Checkbox
                    checked={false}
                    value={itens.description}
                    onChange={() => {}}
                    disabled={true}
                  />
                  <label className="m-1">
                    {itens.description.toUpperCase()}
                  </label>
                </div>
              ))}
            </FiltersList> */}
          </FiltersWrapper>
        </>
      )}
    </>
  );
};

export default Filters;
