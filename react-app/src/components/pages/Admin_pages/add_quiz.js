import React from "react";
import { Segment } from "semantic-ui-react";
import Addquizform from '../../forms/Addquizform';
class NewBookPage extends React.Component {
  state={
    quiz:null
  }
}
render()
{
  return(
    <Segment>
    <h1>Add quiz to collection </quiz>
    <Addquizform/>
    </segment>
  );
}
}
export default NewBookpage;
