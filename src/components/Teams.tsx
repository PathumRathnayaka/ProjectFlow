import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchTeams, fetchUsers, addTeamAsync, updateTeamAsync, deleteTeamAsync, addUserAsync, updateUserAsync, deleteUserAsync } from '../store/slices/teamsSlice';
import { setActiveModal } from '../store/slices/uiSlice';
import { Plus, Search, Edit, Trash2, Mail, Shield, Users, Crown, Send } from 'lucide-react';
import { TeamModal } from './modals/TeamModal';
import { UserModal } from './modals/UserModal';

export const Teams: React.FC = () => {
  const dispatch = useDispatch();
  const { teams, users, loading, error } = useSelector((state: RootState) => state.teams);
  const { activeModal } = useSelector((state: RootState) => state.ui);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'teams' | 'members'>('teams');

  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateTeam = () => {
    setSelectedTeam(null);
    dispatch(setActiveModal('team-new'));
  };

  const handleEditTeam = (teamId: string) => {
    setSelectedTeam(teamId);
    dispatch(setActiveModal(`team-${teamId}`));
  };

  const handleDeleteTeam = (teamId: string) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      dispatch(deleteTeamAsync(teamId));
    }
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    dispatch(setActiveModal('user-new'));
  };

  const handleEditUser = (userId: string) => {
    setSelectedUser(userId);
    dispatch(setActiveModal(`user-${userId}`));
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUserAsync(userId));
    }
  };

  const handleSendEmail = () => {
    if (emailInput.trim()) {
      // Handle email sending logic here (unchanged from original)
      console.log('Sending email to:', emailInput);
      setEmailInput('');
    }
  };

  const getTeamMemberCount = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    return team ? team.memberIds.length : 0;
  };

  const getTeamName = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    return team?.name || 'Unknown Team';
  };

  const getRoleBadge = (role: string) => {
    const roleStyles = {
      admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      manager: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      member: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      viewer: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    };

    const roleIcons = {
      admin: <Crown className="h-3 w-3" />,
      manager: <Shield className="h-3 w-3" />,
      member: <Users className="h-3 w-3" />,
      viewer: <Users className="h-3 w-3" />,
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${roleStyles[role as keyof typeof roleStyles]}`}>
        {roleIcons[role as keyof typeof roleIcons]}
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Teams</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage teams and team members</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={activeTab === 'teams' ? handleCreateTeam : handleCreateUser}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            {activeTab === 'teams' ? 'Create Team' : 'Add Member'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('teams')}
          className={`pb-2 px-1 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'teams'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Teams ({teams.length})
        </button>
        <button
          onClick={() => setActiveTab('members')}
          className={`pb-2 px-1 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'members'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Members ({users.length})
        </button>
      </div>

      {/* Search and Email Input */}
      <div className="flex items-center gap-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {activeTab === 'members' && (
          <div className="relative max-w-md">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="email"
              placeholder="Enter email address..."
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendEmail()}
              className="w-full pl-10 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSendEmail}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <Send className="h-4 w-4 text-gray-500 hover:text-blue-600" />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {activeTab === 'teams' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: team.color }}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {team.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {team.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEditTeam(team.id)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <Edit className="h-4 w-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleDeleteTeam(team.id)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Members</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {getTeamMemberCount(team.id)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Team Lead</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {users.find(u => u.id === team.leaderId)?.name || 'Not assigned'}
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex -space-x-2">
                    {users
                      .filter(user => team.memberIds.includes(user.id))
                      .slice(0, 4)
                      .map((user) => (
                        <img
                          key={user.id}
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                        />
                      ))}
                    {getTeamMemberCount(team.id) > 4 && (
                      <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                          +{getTeamMemberCount(team.id) - 4}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Team
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.avatar}
                          alt=""
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {getTeamName(user.teamId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {user.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.isActive
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditUser(user.id)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty States */}
      {((activeTab === 'teams' && filteredTeams.length === 0) || 
        (activeTab === 'members' && filteredUsers.length === 0)) && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Users className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No {activeTab} found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm
              ? 'Try adjusting your search'
              : `Get started by creating your first ${activeTab === 'teams' ? 'team' : 'team member'}`
            }
          </p>
          {!searchTerm && (
            <button
              onClick={activeTab === 'teams' ? handleCreateTeam : handleCreateUser}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              {activeTab === 'teams' ? 'Create Team' : 'Add Member'}
            </button>
          )}
        </div>
      )}

      {/* Modals */}
      {activeModal?.startsWith('team-') && (
        <TeamModal
          teamId={activeModal === 'team-new' ? null : activeModal.replace('team-', '')}
          onClose={() => dispatch(setActiveModal(null))}
        />
      )}
      {activeModal?.startsWith('user-') && (
        <UserModal
          userId={activeModal === 'user-new' ? null : activeModal.replace('user-', '')}
          onClose={() => dispatch(setActiveModal(null))}
        />
      )}
    </div>
  );
};

export default Teams;