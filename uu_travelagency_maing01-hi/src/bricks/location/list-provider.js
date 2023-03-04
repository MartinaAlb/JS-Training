//@@viewOn:imports
import { createComponent, Utils } from "uu5g05";
import Config from "./config/config";
//@@viewOff:imports

let locationList = [
  {
    id: Utils.String.generateId(),
    name:"",
    country:"",
    city:"",
    address:"",
    phoneNumber:""
  },
  {
    id: Utils.String.generateId(),
    name:"",
    country:"",
    city:"",
    address:"",
    phoneNumber:""
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
    const value = { locationList }
    return typeof props.children === "function" ? props.children(value) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListProvider };
export default ListProvider;
//@@viewOff:exports
