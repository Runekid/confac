import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Container, Row, Form} from 'react-bootstrap';
import {t} from '../utils';
import {ArrayInput} from '../controls/form-controls/inputs/ArrayInput';
import {patchProjectsMonth} from '../../actions';
import {StickyFooter} from '../controls/other/StickyFooter';
import {BusyButton} from '../controls/form-controls/BusyButton';
import {useDocumentTitle} from '../hooks/useDocumentTitle';
import {Audit} from '../admin/Audit';
import {Claim} from '../users/models/UserModel';
import {getNewProjectMonth} from './models/getNewProject';
import {ProjectMonthModel} from './models/ProjectMonthModel';
import {projectMonthFormProperties} from './models/ProjectFormConfig';
import {useProjectsMonth} from '../hooks/useProjects';



interface EditProjectMonthsProps {
  match: {
    params: {
      month: string;
      projectMonthId: string;
    };
  };
}




export const EditProjectMonths = (props: EditProjectMonthsProps) => {
  const dispatch = useDispatch();
  const model = useProjectsMonth(props.match.params.projectMonthId);
  const [projectMonth, setProjectMonth] = useState<ProjectMonthModel>((model && model.details) || getNewProjectMonth());

  const docTitle = projectMonth._id ? 'projectMonthEdit' : 'projectMonthNew';
  const consultantName = (model && model.consultantName) || '';
  const clientName = (model && model.client.name) || '';
  useDocumentTitle(docTitle, {consultantName, clientName});

  if (model && !projectMonth._id) {
    setProjectMonth(model.details);
  }

  const isButtonDisabled = (): boolean => false;

  return (
    <Container className="edit-container">
      <Form>
        <Row className="page-title-container">
          <h1>{model ? `${model.consultantName} @ ${clientName}` : t('titles.projectMonthNew')}</h1>
          <Audit audit={projectMonth.audit} />
        </Row>
        <Row>
          <ArrayInput
            config={projectMonthFormProperties}
            model={projectMonth}
            onChange={(value: { [key: string]: any }) => setProjectMonth({...projectMonth, ...value})}
            tPrefix="projectMonth.props."
          />
        </Row>
      </Form>
      <StickyFooter claim={Claim.ValidateProjectMonth}>
        <BusyButton
          onClick={() => dispatch(patchProjectsMonth(projectMonth))}
          disabled={isButtonDisabled()}
        >
          {t('save')}
        </BusyButton>
      </StickyFooter>
    </Container>
  );
};
