import React, { useReducer, createContext, useContext, useEffect } from 'react';

// Retrieve data from localStorage or use the default initial state 
const initialState = {
  user: null,
  TokenUser: JSON.parse(localStorage.getItem('TokenUser')) || [] ,
  AddQuestion :JSON.parse(localStorage.getItem('AddQuestion')) || null,
  togle :    JSON.parse(localStorage.getItem('togle'))    ||    "false",
  BasketMassages : JSON.parse(localStorage.getItem('BasketMessage')) || [],
  // userTage : JSON.parse(localStorage.getItem('userTage')) || '',
  UserProfile  : JSON.parse(localStorage.getItem("userProfile")) || [],
  SavePost : JSON.parse(localStorage.getItem("SavePost")) || [],
  currentUser : JSON.parse(localStorage.getItem("currentUser")) || null,
  currentPictuer : JSON.parse(localStorage.getItem("currentPictuer")) || null,
  Ram : [],
  userProfileSe:JSON.parse(localStorage.getItem("userProfileSe")) || null,
  SiriVoice : JSON.parse(localStorage.getItem("OpenSiri")) || false,
  StartRecodingValue :  JSON.parse(localStorage.getItem("RecordVoice")) || false

};

// Reducer function
const reducer = (state, action) => {
 
       
      
  switch (action.type) {

    case "STARTVOCEMESSAGERECORDING3":
      const VoiceReconigze = action.voicePaylod 
      localStorage.setItem("RecordVoice",JSON.stringify(VoiceReconigze))

      return{
        ...state,
        StartRecodingValue  : VoiceReconigze,
      }

    case "SET_SIRI_VOICE":
      const setSiri = action.paySiri
      localStorage.setItem("OpenSiri",JSON.stringify(setSiri))
      return{
      ...state,
      SiriVoice : setSiri,
      }

    case "SeeMyProfile":
      const userProfileSedata  = [action.paylod]
      localStorage.setItem("userProfileSe",JSON.stringify(userProfileSedata))
      return{
        ...state,
        userProfileSe : userProfileSedata
      }



    case "Ram":
      const Ram2  = [action.payloadData]

    return{
      ...state,
      Ram:Ram2
    }

    case "CURRENT__PIC":
      const currentPic  = [action.paylod]
      localStorage.setItem("currentPictuer",JSON.stringify(currentPic))
      return{
        ...state,
        currentPictuer : currentPic
      }



    case "CURRENT__USER":
      const current  = [action.paylod]
      localStorage.setItem("currentUser",JSON.stringify(current))
      return{
        ...state,
        currentUser : current
      }








    case  "SAVE__POST":
      const SavePostx = [...state.SavePost,action.paylodSave]
      localStorage.setItem("SavePost",JSON.stringify(SavePostx))
    return{
      ...state,
      SavePost : SavePostx

    }
  
    case "SET__PROFILE__USER":
      const SetData = [action.payload]
      localStorage.setItem("userProfile",JSON.stringify(SetData))
      return{
        ...state,
        UserProfile :SetData
      }



    case "MESSAGES":
      const updatedData = [action.payload];
      
      // Update localStorage with the new data
      localStorage.setItem('BasketMessage', JSON.stringify(updatedData));
      
      return {
        ...state,
        BasketMassages: updatedData
      };



    case "ADD__TOOGLE":
      localStorage.setItem("togle",JSON.stringify(action.toogle))
      return{
        ...state,
        togle : action.toogle
      }



    case "ADD__NEW__USER":
      // Save to localStorage when TokenUser is updated
      localStorage.setItem('TokenUser', JSON.stringify(action.payload));
      return {
        ...state,
        TokenUser: action.payload
      };
    case "ADD__QUESTION":
      localStorage.setItem('AddQuestion', JSON.stringify(action.payload2));

      return{
        ...state,
        AddQuestion : action.payload2
      }


      // case "ADD__TAG__USER":
      //   localStorage.setItem('userTage', JSON.stringify(action.paylod));
  
      //   return{
      //     ...state,
      //     userTage : action.paylod
      //   }
  

    default:
      return state;
  }
};

// Create context
const GlobalContext = createContext();

// Context provider component
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    //console.log(state);
  }, [state.TokenUser,state.AddQuestion]);



  return (
    <GlobalContext.Provider value={{ state, dispatch, user: state.user, TokenUser: state.TokenUser,AddQuestion:state.AddQuestion,togle:state.togle,BasketMassages:state.BasketMassages
      ,userTage:state.userTage,UserProfile:state.UserProfile,SavePost : state.SavePost,
      currentUser : state.currentUser ,currentPictuer :state.currentPictuer,
      Ram:state.Ram,
      userProfileSe:state.userProfileSe,
      SiriVoice : state.SiriVoice,
      StartRecodingValue : state.StartRecodingValue
      
     }}>
      
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the context
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
