import React from 'react'
import { Grid } from "semantic-ui-react"
import SidePanel from './components/SidePanel/SidePanel'

function App() {
  return (
    <Grid columns="2"  style={{background:"#eee", height:"110vh"}}>
      <Grid.Column width="3" style={{background:"#000"}}>
      {/* Sidebar */}
      <SidePanel />
      </Grid.Column>
      <Grid.Column width="13" style={{background: "#eee"}}>
      {/* chat ppanel */}
      </Grid.Column>
    </Grid>
  );
}

export default App;
