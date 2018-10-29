import React from 'react';
import { Formik } from 'formik';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import * as Yup from 'yup';
import TextInput from '../TextInput';
import TextArea from '../TextArea';
import AsyncButton from '../AsyncButton';
import Spinner from '../Spinner';
import { CenterWrapper } from '../../styles/App';
import history from '../../utils/history';
import { DAILY_REPORTS_QUERY } from '../../containers/DailyReportPage/DailyReportContainer';

const SINGLE_REPORT_QUERY = gql`
  query SINGLE_REPORT_QUERY($id: ID!) {
    dailyReport(where: { id: $id }) {
      id
      title
      achievement
      plan
      comment
    }
  }
`;

const UPDATE_DAILY_REPORT_QUERY = gql`
  mutation UPDATE_DAILY_REPORT_QUERY(
    $id: ID!
    $title: String!
    $achievement: String
    $plan: String!
    $comment: String
  ) {
    updateDailyReport(
      id: $id
      title: $title
      achievement: $achievement
      plan: $plan
      comment: $comment
    ) {
      id
      title
      achievement
      plan
      comment
    }
  }
`;

const DailyReportSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required.'),
  achievement: Yup.string()
    .required('Achievement is required.'),
  plan: Yup.string()
    .required('Plan is required.')
});

const DailyReportFormUpdate = ({ match }) => (
  <Query
    query={SINGLE_REPORT_QUERY}
    variables={{
      id: match.params.id
    }}
  >
    {({ data, loading }) =>{

      if (loading) return <Spinner />;
      if (!data.dailyReport) return <div>Daily Report Not Found for ID {match.params.id}</div>;

      const { title, achievement, plan, comment } = data.dailyReport;

      return (
        <Mutation
          mutation={UPDATE_DAILY_REPORT_QUERY}
          onCompleted={() => history.push('/reports')}
          update={(store, { data: { updateDailyReport } }) => {
            const data = store.readQuery({ query: DAILY_REPORTS_QUERY });
            data.userReports = data.userReports.map(report => report.id === updateDailyReport.id
              ? updateDailyReport
              : report
            );
            store.writeQuery({ query: DAILY_REPORTS_QUERY, data });
          }}
        >
          {( updateDailyReport, { loading, error }) => (
            <CenterWrapper>

              {error && <div>error</div>}

              <Formik
                initialValues={{
                  title,
                  achievement,
                  plan,
                  comment
                }}
                enableReinitialize
                validationSchema={DailyReportSchema}
                onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {

                  const { title, achievement, plan, comment } = values;

                  try {
                    await updateDailyReport({
                      variables: {
                        id: match.params.id,
                        title,
                        achievement,
                        plan,
                        comment
                      }
                    });
                    setStatus({success: true});
                  } catch (error) {
                    setStatus({success: false});
                    setSubmitting(false);
                    setErrors({submit: error.message})
                  }
                }}

                render={({ values, handleSubmit, handleChange, touched, errors }) => (
                  <form onSubmit={handleSubmit}>

                    <TextInput
                      type="text"
                      label="Title"
                      name="title"
                      defaultValue={values.title}
                      error={touched.title && errors.title}
                      onChange={handleChange}
                    />

                    <TextArea
                      type="textarea"
                      label="Today Achievement"
                      name="achievement"
                      defaultValue={values.achievement}
                      error={touched.achievement && errors.achievement}
                      onChange={handleChange}
                    />

                    <TextArea
                      type="textarea"
                      label="Plan for next day"
                      name="plan"
                      defaultValue={values.plan}
                      error={touched.plan && errors.plan}
                      onChange={handleChange}
                    />

                    <TextArea
                      type="textarea"
                      label="Comment"
                      name="comment"
                      defaultValue={values.comment}
                      error={touched.comment && errors.comment}
                      onChange={handleChange}
                    />

                    <AsyncButton
                      buttonName="Update"
                      type="submit"
                      loading={loading}
                    />
                  </form>
                )}
              />
            </CenterWrapper>
          )}
        </Mutation>
      )
    }}
  </Query>
)

export default DailyReportFormUpdate;