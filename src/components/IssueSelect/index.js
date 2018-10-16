import React from 'react'
import { FieldArray, Field } from 'formik'
import uuidv1 from 'uuid/v1'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Select } from '../../styles/IssueSelect';

const FETCH_ISSUES_QUERY = gql`
  query {
    issues {
      id
      name
      description
    }
  }
`;

const IssueSelect = ({values}) => (
  <Query query={FETCH_ISSUES_QUERY}>
    {({ loading, error, data } ) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error</div>;
      const { issues } = data;

      return (
        <FieldArray
          name="issues"
          render={({ remove, insert, push }) => (
            <Select>
              {values.issues && values.issues.length > 0 ? (
                values.issues.map((issue, index) => (
                  <div key={uuidv1()}>
                    <div>

                      <Field component="select" name={`issues.${index}`}>
                        {issues.map(issue => (
                          <option
                            key={issue.id}
                            value={issue.id}
                          >
                            {issue.name}
                          </option>
                        ))}
                      </Field>

                    </div>

                    <div>
                      <button
                        onClick={() => remove(index)}
                      >
                        <b> - </b>
                      </button>
                      <button
                        onClick={() => insert(index, issues[0].id)}
                      >
                        <b> + </b>
                      </button>
                    </div>

                  </div>
                ))
              ) : (
                <button
                  onClick={() => push(issues[0].id)}
                >
                  <b> + </b> Add new issue
                </button>
              )}
            </Select>
          )}
        />
      )
    }}
  </Query>
);

export default IssueSelect;