import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../lib/store"
import { SingleCharacterFetch } from "../../components/DataFetcher/DataFetcher";
import { setSelectedCharacter } from "../../lib/features/MiscSlice/MiscSlice";
import { Character } from "../../utils/types";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


import './styles.css';
import { useNavigate } from "react-router-dom";
import { DialogWindow } from "../../components/DialogWindow/DialogWindow";
export function CharacterPage () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentCharacter = useSelector((state : RootState) => state.misc).selectedCharacter;

  const fetcher = async() => {
    const currentUrl = window.location.href;
    let currentId = "";
    for (let i = currentUrl.length - 1; i > 0; i--) {
      if (currentUrl[i] !== "/") {
        currentId += currentUrl[i];
      } else {
        break;
      }
    }
    const result = await SingleCharacterFetch(Number(currentId));
    dispatch(setSelectedCharacter(result))
  }

  if (currentCharacter === undefined) {
    fetcher();
  }


  function bioGenerator(character : Character) {
    switch (character.gender) {
      case ("Male") : {
        return (
          <div className="character__bio">
            <p>He is {character.species}</p>
            {
              (character.origin.name === "unknown") 
              ? <p>
                  It's unclear where this {character.species} is from {character.origin.name}
                </p>
              : <p>
                  He is from {character.origin.name}
                </p>
            }
            {(character.status === "unknown") 
            ? <p>
              It's unclear what status of this character
            </p>
            :<p>
              Right now he is {character.status}
            </p>
            }            
          </div>
        )
      }
      case ("Female") : {
        return (
          <div className="character__bio">
            <p>She is {character.species}</p>
            {
              (character.origin.name === "unknown") 
              ? <p>
                  It's unclear where this {character.species} is from {character.origin.name}
                </p>
              : <p>
                  She is from {character.origin.name}
                </p>
            }
            {(character.status === "unknown") 
            ? <p>
              It's unclear what status of this character
            </p>
            :<p>
              Right now she is {character.status}
            </p>
            }            
          </div>
        )
      }
      default : {
        return (
          <div className="character__bio">
          <p>It is {character.species}</p>
          {
            (character.origin.name === "unknown") 
            ? <p>
                It's unclear where this {character.species} is from {character.origin.name}
              </p>
            : <p>
                It is from {character.origin.name}
              </p>
          }
          {(character.status === "unknown") 
          ? <p>
            It's unclear what status of this character
          </p>
          :<p>
            Right now it is {character.status}
          </p>
          }            
        </div>
        )
      }
    }
  }

  

  return(
    <>
      <DialogWindow />
      <div className="character">
        <div className="character__goback">
          <div
            className="character__goback--text"
            onClick={() => {
              navigate("/")
              dispatch(setSelectedCharacter(undefined))
            }}
          >
            <KeyboardBackspaceIcon/>
            Go back
          </div>
        </div>
        <div className="character__container">
          <h1 className="character__name">
            {
              currentCharacter?.name
            }
          </h1>
          <img src={currentCharacter?.image} alt={currentCharacter?.name} />
          <p className="character__status">
            {
              (currentCharacter !== undefined) ? bioGenerator(currentCharacter) : ""
              
            }
          </p>
        </div>
      </div>
    </>
  )
}