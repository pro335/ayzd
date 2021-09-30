import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RichTextEditor from 'react-rte';
import 'react-tagsinput/react-tagsinput.css';
import propTypes from 'prop-types';
import { MailBox } from './style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import Heading from '../../../../components/heading/heading';
import * as ActionTypes from '../../../../redux/ActionTypes';
import isValid from '../../../../utility/isValid';

const FullDescription = ({ onChange, onSend, defaultTag, replay, text, guideCategory = "project", guideId = "0", guideAction = "create" }) => {

  /**
   * Description about the each parameters
   * 
   * guideCategory: "project": full description of the project, "guide": full description of the guide, default: project,
   * guideId: the object id of media, default: "0",
   * guideAction: "create": add, "update": update, default: 1
   * 
   */

  const dispatch = useDispatch();
  
  const { project, guide } = useSelector(state => {
    return {
      project: state.project,
      guide: state.guide,
    };
  });

  const [state, setState] = useState({
    value: RichTextEditor.createEmptyValue(),
    tags: defaultTag ? [defaultTag] : [],
  });

  useEffect(() => {
    let temp_value = RichTextEditor.createEmptyValue();

    guide.guide_action === "create" ? RichTextEditor.createEmptyValue() : RichTextEditor.createValueFromString(guide.guideData.full_description, "html")

    if(guideCategory === "project") {   // project
      if(project.project_action === 0) {    // create project
        temp_value = RichTextEditor.createEmptyValue();
      } else {    // update project
        temp_value = RichTextEditor.createValueFromString(project.projectData.full_description, "html");
      }
    } else if(guideCategory === "guide") {    // guide
      if(guide.guide_action === "create") {   // create guide
        temp_value = RichTextEditor.createEmptyValue();
      } else {    // update guide
        temp_value = RichTextEditor.createValueFromString(guide.guideData.full_description, "html");
      }
    }

    setState({
      ...state,
      value: temp_value
    });
  }, [])
  
  const onChanges = value => {
    setState({ ...state, value });
    if (onChange) {
      onChange(value.toString('html'));
    }

    let newVal = null;
    if(guideCategory === "project") {      // full description of the project
      newVal = {
        ...project.projectData,
        full_description: value.toString('html'),
      };
      dispatch({
        type: ActionTypes.SET_PROJECT,
        data: newVal
      });
    } else {    // full description of the guide
      newVal = {
        ...guide.guideData,
        full_description: value.toString('html'),
      };
      dispatch({
        type: ActionTypes.SET_GUIDE,
        data: newVal
      });
    }
};

  const handleChange = tags => {
    setState({ ...state, tags });
  };

  const onSubmit = () => {
    onSend && onSend(state.value.toString('html'));
  };

  return (
    <Cards
      title={
        <div className="setting-card-title">
          <Heading as="h4">Full description</Heading>
        </div>
      }
    >
      <MailBox>
        <div className="body">
          <div className="group">
            <RichTextEditor placeholder="" value={state.value} onChange={onChanges}/>
          </div>
        </div>
      </MailBox>
    </Cards>
  );
};

FullDescription.propTypes = {
  onChange: propTypes.func,
  onSend: propTypes.func,
  defaultTag: propTypes.string,
  replay: propTypes.bool,
  text: propTypes.bool,
};

export default FullDescription;
