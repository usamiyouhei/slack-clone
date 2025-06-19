import WorkspaceSelector from './WorkspaceSelector';
import './Home.css';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { useCurrentUserStore } from "../../modules/auth/current-user.state";
import { Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Workspace } from '../../modules/workspaces/workspace.entity';
import { workspaceRepository } from "../../modules/workspaces/workspace.repository";

function Home() {
  const { currentUser } = useCurrentUserStore();
  const [ workspaces, setWorkspaces ] = useState<Workspace[]>([])
  const params = useParams();
  const { workspaceId } = params;
  const selectedWorkspace = workspaces.find((workspace) => workspace.id == workspaceId)

  useEffect(() => {
    fetchWorkspace()
  }, [])
  
  const fetchWorkspace = async () => {
    try {
      const workspaces = await workspaceRepository.find();
      setWorkspaces(workspaces)
    } catch (error) {
      console.error('ワークスペースの取得に失敗しました', error);
    }
  }
  if(currentUser == null) return <Navigate to="/signin" />
  return (
    <div className="slack-container">
      <WorkspaceSelector 
      workspaces={workspaces}
      setWorkspaces={setWorkspaces}
      selectedWorkspaceId={workspaceId!}
      />
      {selectedWorkspace != null ? (
      <>
        <Sidebar selectedWorkspace={selectedWorkspace}/>
        <MainContent />
      </>
      ) : (
        <div className='sidebar'/>
      )}
    </div>
  );
}

export default Home;
