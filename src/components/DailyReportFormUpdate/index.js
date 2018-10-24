import React, { Fragment } from 'react';
import { Formik } from 'formik';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import TextInput from '../TextInput';
import TextArea from '../TextArea';
import IssueSelect from '../IssueSelect';
import AsyncButton from '../AsyncButton';
import { parseToArrayOfObject } from '../../utils/parseToArrayOfObject';

const SINGLE_REPORT_QUERY = gql`
  query SINGLE_REPORT_QUERY($id: ID!) {
    dailyReport(where: { id: $id }) {
      id
      title
      achievement
      issues {
        id
        name
        description
      }
      plan
      description
      comment
    }
  }
`;

const UPDATE_DAILY_REPORT_QUERY = gql`
  mutation UPDATE_DAILY_REPORT_QUERY(
    $id: ID!
    $title: String!
    $achievement: String
    $issues: [IssueInput!]
    $plan: String!
    $description: String
    $comment: String
  ) {
    updateDailyReport(
      id: $id
      title: $title
      achievement: $achievement
      issues: $issues
      plan: $plan
      description: $description
      comment: $comment
    ) {
      id
    }
  }
`;

const DailyReportFormUpdate = ({ match }) => (
  <Query
    query={SINGLE_REPORT_QUERY}
    variables={{
      id: match.params.id
    }}
  >
    {({ data, loading }) =>{
      if (loading) return <div>Loading...</div>;
      if (!data.dailyReport) return <div>Daily Report Not Found for ID {match.params.id}</div>;

      const { title, achievement, issues, plan, description, comment } = data.dailyReport;

      return (
        <Mutation
          mutation={UPDATE_DAILY_REPORT_QUERY}
        >
          {( updateDailyReport, { loading, error }) => (
            <Fragment>
              {loading && <div>Loading...</div>}
              {error && <div>error</div>}

              <Formik
                initialValues={{
                  title,
                  achievement,
                  issues,
                  plan,
                  description,
                  comment
                }}
                enableReinitialize
                onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {

                  const { title, achievement, plan, description, comment } = values;
                  const issues = parseToArrayOfObject(values.issues);

                  try {
                    await updateDailyReport({
                      variables: {
                        id: match.params.id,
                        title,
                        achievement,
                        issues,
                        plan,
                        description,
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
                      value={values.title || ''}
                      error={touched.title && errors.title}
                      onChange={handleChange}
                    />

                    <TextArea
                      type="textarea"
                      label="Today Achievement"
                      name="achievement"
                      value={values.achievement || ''}
                      error={touched.achievement && errors.achievement}
                      onChange={handleChange}
                    />

                    <IssueSelect values={values} />

                    <TextArea
                      type="textarea"
                      label="Plan for next day"
                      name="plan"
                      value={values.plan || ''}
                      error={touched.plan && errors.plan}
                      onChange={handleChange}
                    />

                    <TextArea
                      type="textarea"
                      label="Description"
                      name="description"
                      value={values.description || ''}
                      error={touched.description && errors.description}
                      onChange={handleChange}
                    />

                    <TextArea
                      type="textarea"
                      label="Comment"
                      name="comment"
                      value={values.comment || ''}
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
            </Fragment>
          )}
        </Mutation>
      )
    }}
  </Query>
);

export default DailyReportFormUpdate;