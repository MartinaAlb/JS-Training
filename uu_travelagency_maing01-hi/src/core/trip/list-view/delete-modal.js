//@@viewOn:imports
import { createVisualComponent, PropTypes, Lsi, useLsi, Utils } from "uu5g05";
import { Modal, Button, Pending } from "uu5g05-elements";
import { Form,
  FormText,
  FormTextArea,
  FormSelect,
  FormFile,
  SubmitButton,
  CancelButton,
  FormNumber,
  FormDate } from "uu5g05-forms";
import { Error } from "uu_plus4u5g02-elements";
import Config from "./config/config";
import importLsi from "../../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  error: () =>
    Config.Css.css({
      padding: 16,
    }),
};
//@@viewOff:css

export const DeleteModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DeleteModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    tripDataObject: PropTypes.object.isRequired,
    shown: PropTypes.bool,
    onCancel: PropTypes.func,
    onDeleteDone: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    shown: false,
    onCancel: () => {},
    onDeleteDone: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [DeleteModal.uu5Tag]);

    async function handleDelete() {
      try {
        // The modal window remains opened during operation and shows possible errors
        // in local Error component (pessimistic approach). The parent component
        // is responsible to close modal window after operation.
        await props.tripDataObject.handlerMap.delete();
        props.onDeleteDone();
      } catch (error) {
        DeleteModal.logger.error("Error submitting form", error);
        throw new Utils.Error.Message(error.message, error);
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const trip = props.tripDataObject.data;

    let content;
    switch (props.tripDataObject.state) {
      case "pending":
        content = <Pending />;
        break;
      case "error":
      case "ready":
      default:
        content = (
          <>
            {props.tripDataObject.state === "error" && (
              <div className={Css.error()}>
                <Error error={props.tripDataObject.errorData} nestingLevel="inline" />
              </div>
            )}
            {Utils.String.format(lsi["question"], trip.name)}
          </>
        );
    }

    const isPending = props.tripDataObject.state === "pending";

    return (
      <Form>
        <Modal header={lsi.header} open={props.shown} onClose={props.onClose} className="center">
          {content}
          <div className={buttonRowCss()} disabled={isPending}>
            <Button onClick={props.onCancel} className={buttonCss()}>
              {lsi.cancel}
            </Button>
            <Button onClick={handleDelete} className={buttonCss()} colorScheme="negative">
              {lsi.delete}
            </Button>
          </div>
        </Modal>
      </Form>
    );
    //@@viewOff:render
  },
});

//@@viewOn:css
const buttonRowCss = () => Config.Css.css`
margin: 16px;
`;

const buttonCss = () => Config.Css.css`
margin: 8px;
`;
//@@viewOff:css

export default DeleteModal;
