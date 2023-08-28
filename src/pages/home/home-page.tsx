import { FC, useState } from "react";
import { BackgroundMain, CardsContainer, Container } from "./styles";
import Navbar from "../../components/organism/Navbar";
import { CardIMC } from "./cards/imc-card";
import { ReceitasCard } from "./cards/receitas-card";
import { ReceitasFavoritasCard } from "./cards/receitas-favoritas-card";
import { useEffectOnce, useIsConnected, useToast } from "../../globals/hooks";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";

export const HomePage: FC = () => {
  const { connection } = useIsConnected();
  const navigate = useNavigate();
  const [conn, setConn] = useState(false);
  const { showWarning } = useToast();

  useEffectOnce(() => {
    if (connection === undefined) {
      navigate("/login");
      showWarning(
        "Usuario não identificado, por favor faça o login novamente!"
      );
    } else setConn(true);
  });

  return (
    <>
      {conn ? (
        <>
          <Container>
            <BackgroundMain>
              <Navbar />
              <CardsContainer>
                <h1
                  className="justify-content-center flex"
                  style={{ color: "black" }}
                >
                  Escolha uma opção:
                </h1>
                <div className="grid m-3 justify-content-center">
                  <CardIMC />
                  <ReceitasCard />
                  <ReceitasFavoritasCard />
                </div>
              </CardsContainer>
            </BackgroundMain>
          </Container>
        </>
      ) : (
        <>
          <div className="card flex justify-content-center">
            <ProgressSpinner />
          </div>
        </>
      )}
    </>
  );
};
