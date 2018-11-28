import React, {Fragment} from 'react';
import Member from 'components/Member';
import PropTypes from 'prop-types';

const MemberActivity = ({ membersActivities, handleRemoveActivity, handleActivityChange, handleAddActivity }) => (
  <Fragment>
    {membersActivities.map((member, idx) => (
      <Member
        // eslint-disable-next-line
        key={idx}
        member={member}
        index={idx}
        handleRemoveActivity={handleRemoveActivity}
        handleActivityChange={handleActivityChange}
        handleAddActivity={handleAddActivity}
      />
    ))}
  </Fragment>
);

MemberActivity.propTypes = {
  membersActivities: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleRemoveActivity: PropTypes.func.isRequired,
  handleActivityChange: PropTypes.func.isRequired,
};

export default MemberActivity;