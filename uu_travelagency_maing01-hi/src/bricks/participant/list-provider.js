//@@viewOn:imports
import { createComponent, Utils } from "uu5g05";
import Config from "./config/config";
//@@viewOff:imports

let participantList = [
  {
    id: Utils.String.generateId(),
    firstname: "Marek",
    surname: "Novak",
    phoneNumber: "420603173488",
    email: "marek.novak@yahoo.com",
    idCardNumber: "119 018 372",
  },
  {
    id: Utils.String.generateId(),
    firstname: "Otto",
    surname: "Albrecht",
    phoneNumber: "42060314546",
    email: "otto.albrecht@yahoo.com",
    idCardNumber: "119 125 372",
  },
  {
    id: Utils.String.generateId(),
    firstname: "Jana",
    surname: "Nova",
    phoneNumber: "420603555488",
    email: "jana.nova@yahoo.com",
    idCardNumber: "119 018 444",
  },
  {
    id: Utils.String.generateId(),
    firstname: "David",
    surname: "Jech",
    phoneNumber: "420805173488",
    email: "david.jech@yahoo.com",
    idCardNumber: "222 018 372",
  },
  {
    id: Utils.String.generateId(),
    firstname: "Igor",
    surname: "Hnizdo",
    phoneNumber: "420755173488",
    email: "igor.hnizdo69@yahoo.com",
    idCardNumber: "119 665 372",
  },
  {
    id: Utils.String.generateId(),
    firstname: "Alena",
    surname: "Polednakova",
    phoneNumber: "420603172228",
    email: "alena.polednakova@yahoo.com",
    idCardNumber: "119 018 898",
  },
  {
    id: Utils.String.generateId(),
    firstname: "Jakub",
    surname: "Jurik",
    phoneNumber: "420803183488",
    email: "jakub.jurik@yahoo.com",
    idCardNumber: "452 018 372",
  },
  {
    id: Utils.String.generateId(),
    firstname: "Martina",
    surname: "Novotna",
    phoneNumber: "420603158988",
    email: "martina.novotna@yahoo.com",
    idCardNumber: "472 018 372",
  },
  {
    id: Utils.String.generateId(),
    firstname: "Nikola",
    surname: "Stara",
    phoneNumber: "420603112578",
    email: "nikola.stara@yahoo.com",
    idCardNumber: "119 018 050",
  },
];

const ListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private



    //@@viewOff:private

    //@@viewOn:render
    const value = { participantList }
    return typeof props.children === "function" ? props.children(value) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListProvider };
export default ListProvider;
//@@viewOff:exports
