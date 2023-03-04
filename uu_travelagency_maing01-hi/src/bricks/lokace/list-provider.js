//@@viewOn:imports
import { createComponent, Utils } from "uu5g05";
import Config from "./config/config";
//@@viewOff:imports

let lokaceList = [
  {
      id: Utils.String.generateId(),
      name: "Hotel riviera",
      address: "15 Makarska riviera",
      city: "Makarska",
      country: "Croatia",
      phoneNumber: "00385546456",
    },
    {
      id: Utils.String.generateId(),
      name: "Hotel Stará Praha",
      address: "Václavské náměstí 12",
      city: "Prague",
      country: "Czech Republic",
      phoneNumber: "420603488173",

    },
    {
      id: Utils.String.generateId(),
      name: "Hotel Excelsior",
      address: "15 Barbare",
      city: "Zaostrog",
      country: "Croatia",
      phoneNumber: "003851234789",

    },
    {
      id: Utils.String.generateId(),
      name:"Hotel Euro",
      address: "Jiráskova 855",
      city: "Pardubice",
      country: "Czech Republic",
      phoneNumber: "420603488443",

    },
    {
      id: Utils.String.generateId(),
      name: "Hotel 100",
      address: "Petyrkova 12",
      city: "Prague",
      country: "Czech Republic",
      phoneNumber: "420603488173",

    },
    {
      id: Utils.String.generateId(),
      name: "Hotek Arnošt",
      address: "Arnošta z Pardubic",
      city: "Pardubice",
      country: "Czech Republic",
      phoneNumber: "420608488173",

    },
    {
      id: Utils.String.generateId(),
      name: "Apartments Sun",
      address: "10 Plaza",
      city: "Makarska",
      country: "Croatia",
      phoneNumber: "003851858756",

    },
    {
      id: Utils.String.generateId(),
      name: "Apartments Dia",
      address: "20 Put Svete Barbare",
      city: "Zaostrog",
      country: "Croatia",
      phoneNumber: "00385123456",
    }
  ]


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
    const value = { lokaceList }
    return typeof props.children === "function" ? props.children(value) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListProvider };
export default ListProvider;
//@@viewOff:exports
