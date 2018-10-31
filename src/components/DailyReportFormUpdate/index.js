import React from 'react';
import { Field, Formik } from 'formik';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Form, Message } from 'semantic-ui-react';
import * as Yup from 'yup';
import TextInput from '../TextInput';
import TextArea from '../TextArea';
import AsyncButton from '../AsyncButton';
import Spinner from '../Spinner';
import { CenterWrapper } from '../../styles/App';
import { DAILY_REPORTS_QUERY } from '../../containers/DailyReportPage/DailyReportContainer';
import RadioButton from '../RadioButton';
import RadioInput from '../RadioInput';

const SINGLE_REPORT_QUERY = gql`
  query SINGLE_REPORT_QUERY($id: ID!) {
    dailyReport(where: { id: $id }) {
      id
      title
      emotion
      achievement
      plan
      comment
    }
  }
`;

const UPDATE_DAILY_REPORT_QUERY = gql`
  mutation UPDATE_DAILY_REPORT_QUERY(
    $id: ID!
    $title: String
    $emotion: String
    $achievement: String
    $plan: String
    $comment: String
  ) {
    updateDailyReport(
      id: $id
      title: $title
      emotion: $emotion
      achievement: $achievement
      plan: $plan
      comment: $comment
    ) {
      id
      title
      emotion
      achievement
      plan
      comment
      createdAt
    }
  }
`;

const DailyReportSchema = Yup.object().shape({
  title: Yup.string().required('Title is required.'),
  emotion: Yup.string().required('Emotion option is required'),
  achievement: Yup.string().required('Achievement is required.'),
  plan: Yup.string().required('Plan is required.')
});

const DailyReportFormUpdate = ({ match }) => (
  <Query
    query={SINGLE_REPORT_QUERY}
    variables={{
      id: match.params.id
    }}
  >
    {({ data, loading }) => {
      if (loading) return <Spinner />;
      if (!data.dailyReport) return <div>Daily Report Not Found for ID {match.params.id}</div>;

      const { title, emotion, achievement, plan, comment } = data.dailyReport;

      return (
        <Mutation
          mutation={UPDATE_DAILY_REPORT_QUERY}
          update={(store, { data: { updateDailyReport } }) => {
            if (store.data.data.ROOT_QUERY.userReports) {
              const data = store.readQuery({ query: DAILY_REPORTS_QUERY });
              data.userReports.dailyReports = data.userReports.dailyReports.map(
                report => (report.id === updateDailyReport.id ? updateDailyReport : report)
              );
              store.writeQuery({ query: DAILY_REPORTS_QUERY, data });
            }
          }}
        >
          {(updateDailyReport, { loading, error }) => (
            <CenterWrapper>
              {error && <div>error</div>}

              <Formik
                initialValues={{
                  title,
                  emotion,
                  achievement,
                  plan,
                  comment
                }}
                enableReinitialize
                validationSchema={DailyReportSchema}
                onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
                  const { title, emotion, achievement, plan, comment } = values;

                  try {
                    await updateDailyReport({
                      variables: {
                        id: match.params.id,
                        title,
                        emotion,
                        achievement,
                        plan,
                        comment
                      }
                    });
                    setStatus({ success: true });
                  } catch (error) {
                    setStatus({ success: false });
                    setSubmitting(false);
                    setErrors({ submit: error.message });
                  }
                }}
                render={({ values, handleSubmit, handleChange, touched, errors, status }) => (
                  <Form
                    onSubmit={handleSubmit}
                    loading={loading}
                    success={status ? status.success : false}
                  >
                    <TextInput
                      type="text"
                      label="Title"
                      name="title"
                      defaultValue={values.title}
                      error={touched.title && errors.title}
                      onChange={handleChange}
                    />

                    <RadioInput
                      id="emotion"
                      label="Emotion"
                      name="emotion"
                      values={values.emotion}
                      error={errors.emotion}
                      touched={touched.emotion}
                    >
                      <Field
                        defaultChecked
                        id=":grinning:"
                        name="emotion"
                        component={RadioButton}
                        label=":grinning:"
                      />

                      <Field
                        id=":neutral_face:"
                        name="emotion"
                        component={RadioButton}
                        label=":neutral_face:"
                      />

                      <Field
                        id=":disappointed_relieved:"
                        name="emotion"
                        component={RadioButton}
                        label=":disappointed_relieved:"
                      />
                    </RadioInput>

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

                    <Message
                      success
                      header="Update Successfully!"
                      content="Your report has been updated."
                    />

                    <AsyncButton buttonName="Update" type="submit" loading={loading} />
                  </Form>
                )}
              />
            </CenterWrapper>
          )}
        </Mutation>
      );
    }}
  </Query>
);

export default DailyReportFormUpdate;
