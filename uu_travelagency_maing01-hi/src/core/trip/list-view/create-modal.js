//@@viewOn:imports
import { createVisualComponent, PropTypes, Lsi, useLsi, Utils } from "uu5g05";
import { Modal } from "uu5g05-elements";
import {
  Form,
  FormText,
  FormTextArea,
  FormSelect,
  FormFile,
  SubmitButton,
  CancelButton,
  FormDate,
  FormNumber
} from "uu5g05-forms";
import Config from "./config/config";
import importLsi from "../../../lsi/import-lsi";
//@@viewOff:imports

export const CreateModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CreateModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    tripDataList: PropTypes.object.isRequired,
    locationDataList: PropTypes.object.isRequired,
    shown: PropTypes.bool,
    onSaveDone: PropTypes.func,
    onCancel: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    shown: false,
    onSaveDone: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [CreateModal.uu5Tag]);

    async function handleSubmit(event) {
      try {
        // The modal window remains opened during operation and shows possible errors
        // (pessimistic approach). The parent component is responsible to close modal
        // window after operation has been successfuly done and show some global success
        // alert if needed.
        const values = { ...event.data.value };

        if (values.locationIdList === undefined) {
          delete values.locationIdList; // trip/create command supports only non-empty array;
        }

        // there is an issue with the ApiClient and this must be here - don't worry too much about it now
        if (values.text === undefined) {
          delete values.text; // check issue above
        }

        const trip = await props.tripDataList.handlerMap.create(values);
        props.onSaveDone(trip);
      } catch (error) {
        CreateModal.logger.error("Error submitting form", error);
        throw new Utils.Error.Message(error.message, error);
      }
    }



    function getLocationItemList() {
      return props.locationDataList.data.map(({ data: location }) => {
        return { value: location.id, children: location.name };
      });
    }
    //@@viewOff:private

    //@@viewOn:render
    const formInputCss = Config.Css.css`margin-bottom:16px`;

    const formControls = (
      <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "flex-end" })}>
        <CancelButton onClick={props.onCancel}>{lsi.cancel}</CancelButton>
        <SubmitButton>{lsi.submit}</SubmitButton>
      </div>
    );

    return (
      <Form.Provider onSubmit={handleSubmit} >
        <Modal header={lsi.header} info={<Lsi lsi={lsi.info} />} open={props.shown} footer={formControls}>
          <Form.View>
            <FormText
              label={lsi.name}
              name="name"
              inputAttrs={{ maxLength: 255 }}
              className={formInputCss}
              required
              autoFocus
            />

            <FormSelect
              label={lsi.location}
              name="locationId"
              itemList={getLocationItemList()}
              className={formInputCss}
              required
            />

            <FormFile label={lsi.image} name="image" accept="image/*" className={formInputCss} />

            <FormText
              label={lsi.text}
              name="text"
              inputAttrs={{ maxLength: 4000 }}
              className={formInputCss}
            />
            <FormNumber
              label={lsi.capacity}
              name="capacity"
              inputAttrs={{ maxLength: 4000 }}
              className={formInputCss}
              required
              autoFocus
            />
            <FormNumber
              label={lsi.pricePerPerson}
              name="pricePerPerson"
              inputAttrs={{ maxLength: 4000 }}
              className={formInputCss}
              required
              autoFocus
            />
            <FormDate
              label={lsi.departureDate}
              name="departureDate"
              inputAttrs={{ maxLength: 4000 }}
              className={formInputCss}
              required
              autoFocus
            />
          </Form.View>
        </Modal>
      </Form.Provider>
    );
    //@@viewOff:render
  },
});

export default CreateModal;
