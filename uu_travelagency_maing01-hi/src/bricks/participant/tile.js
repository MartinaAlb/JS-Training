//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Box, Text, Line, Button, DateTime } from "uu5g05-elements";
import Config from "./config/config.js";
import {Icon} from "uu5g05-elements";
//@@viewOff:imports

const Tile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    participant: PropTypes.shape({
      firstname: PropTypes.string,
      surname: PropTypes.string,
      phoneNumber: PropTypes.string,
      email: PropTypes.string,
      idCardNumber: PropTypes.string
    })
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private



    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props);

    return (
      <Box {...elementProps}>
        <div>
        <Text category="interface" segment="title" type="minor" colorScheme="building" >
          <Icon icon="mdi-account" /> {props.participant.firstname} {props.participant.surname}
        </Text>
      </div>
        <Line significance="subdued" />
        <div>
          <Text category="interface" segment="content" type="medium" colorScheme="building">
            <Icon icon="mdi-phone" /> {props.participant.phoneNumber}
          </Text>
        </div>

          <div>
          <Text category="interface" segment="content" type="medium" colorScheme="building">
            <Icon icon="mdi-email" /> {props.participant.email}
          </Text>
          </div>
            <div>
          <Text category="interface" segment="content" type="medium" colorScheme="building">
            <Icon icon="mdi-passport-biometric" /> {props.participant.idCardNumber}
          </Text>
        </div>
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Tile };
export default Tile;
//@@viewOff:exports
