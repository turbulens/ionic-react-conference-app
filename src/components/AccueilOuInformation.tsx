import React from 'react';
import { connect } from '../data/connect';
import { Redirect } from 'react-router';

interface StateProps {
  hasSeenInformation: boolean;
}

const AccueilOuInformation: React.FC<StateProps> = ({ hasSeenInformation }) => {
  return hasSeenInformation ? <Redirect to="/tabs/planification" /> : <Redirect to="/information" />
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    hasSeenInformation: state.user.hasSeenInformation
  }),
  component: AccueilOuInformation
});