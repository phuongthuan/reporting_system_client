import React from 'react';
import { Formik } from 'formik';
import gql from 'graphql-tag';
import * as Yup from 'yup';
import { Mutation } from 'react-apollo';
import TextArea from '../TextArea';
import TextInput from '../TextInput';
import AsyncButton from '../AsyncButton';
import IssueSelect from '../IssueSelect';
import { parseToArrayOfObject } from '../../utils/parseToArrayOfObject';
import { CenterWrapper } from '../../styles/App';
import history from '../../utils/history';
import { DAILY_REPORTS_QUERY } from '../../containers/DailyReportPage/DailyReportContainer';

const CREATE_DAILY_REPORT_MUTATION = gql`

  mutation CREATE_DAILY_REPORT_MUTATION (
    $title: String!
    $achievement: String
    $issues: [IssueInput!]
    $plan: String!
    $description: String
    $comment: String
  ) {
    createDailyReport(
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

const DailyReportSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required.'),
  achievement: Yup.string()
    .required('Achievement is required.'),
  plan: Yup.string()
    .required('Plan is required.')
});


const DailyReportForm = () => (
  <Mutation
    mutation={CREATE_DAILY_REPORT_MUTATION}
    onCompleted={() => history.push('/reports')}
    update={(store, { data: { createDailyReport } }) => {
      const data = store.readQuery({ query: DAILY_REPORTS_QUERY });
      data.userReports.push(createDailyReport);
      store.writeQuery({ query: DAILY_REPORTS_QUERY, data });
    }}
  >
    {(createDailyReport, { loading, error }) => (
      <CenterWrapper>
        {error && <div>error</div>}
        <Formik
          initialValues={{
            title: '',
            achievement: '',
            issues: [],
            plan: '',
            description: '',
            comment: ''
          }}
          enableReinitialize
          validationSchema={DailyReportSchema}
          onSubmit={async (values, { setSubmitting, setStatus, setErrors, resetForm }) => {
            const { title, achievement, plan, description, comment } = values;

            const issues = parseToArrayOfObject(values.issues);

            try {
              await createDailyReport({
                variables: {
                  title,
                  achievement,
                  issues,
                  plan,
                  description,
                  comment
                }
              });

              resetForm({});
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

              <IssueSelect values={values || ''} />

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
                buttonName="Create"
                type="submit"
                loading={loading}
              />
            </form>
          )}
        />
      </CenterWrapper>
    )}
  </Mutation>
);

export default DailyReportForm;