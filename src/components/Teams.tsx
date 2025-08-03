import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addTeam, updateTeam, deleteTeam, addUser, updateUser, deleteUser, sendInvitation, updateInvitation, deleteInvitation, assignUserToTeam } from '../store/slices/teamsSlice';
import { setActiveModal } from '../store/slices/uiSlice';
import { Plus, Search, Edit, Trash2, Mail, Shield, Users, Crown, Send, Clock, Check, X, UserPlus } from 'lucide-react';
import { TeamModal } from './modals/TeamModal';
import { UserModal } from './modals/UserModal';
import { InvitationModal } from './modals/InvitationModal';

export const Teams: React.FC = () => {
  const dispatch = useDispatch();
  const { teams, users, invitations } = useSelector((state: RootState) => state.teams);
  const { activeModal } = useSelector((state: RootState) => state.ui);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'teams' | 'members' | 'invitations'>('teams');

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInvitations = invitations.filter(invitation =>
    invitation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (invitation.message && invitation.message.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const acceptedInvitations = filteredInvitations.filter(inv => inv.status === 'accepted');
  const pendingInvitations = filteredInvitations.filter(inv => inv.status === 'pending');

  const handleCreateTeam = () => {
    setSelectedTeam(null);
    dispatch(setActiveModal('team-modal'));
  };

  const handleEditTeam = (teamId: string) => {
    setSelectedTeam(teamId);
    dispatch(setActiveModal('team-modal'));
  };

  const handleDeleteTeam = (teamId: string) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      dispatch(deleteTeam(teamId));
    }
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    dispatch(setActiveModal('user-modal'));
  };

  const handleEditUser = (userId: string) => {
    setSelectedUser(userId);
    dispatch(setActiveModal('user-modal'));
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
    }
  };

  const handleSendInvitation = () => {
    dispatch(setActiveModal('invitation-modal'));
  };

  const handleDeleteInvitation = (invitationId: string) => {
    if (window.confirm('Are you sure you want to delete this invitation?')) {
      dispatch(deleteInvitation(invitationId));
    }
  };

  const handleAssignToTeam = (userId: string, teamId: string) => {
    dispatch(assignUserToTeam({ userId, teamId }));
  };

  const getTeamMemberCount = (teamId: string) => {
    return users.filter(user => user.teamId === teamId).length;
  };

  const getTeamName = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    return team?.name || 'Unknown Team';
  };

  const getInviterName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user?.name || 'Unknown User';
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

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      accepted: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      declined: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      expired: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    };

    const statusIcons = {
      pending: <Clock className="h-3 w-3" />,
      accepted: <Check className="h-3 w-3" />,
      declined: <X className="h-3 w-3" />,
      expired: <X className="h-3 w-3" />,
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
        {statusIcons[status as keyof typeof statusIcons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
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
            onClick={
              activeTab === 'teams' ? handleCreateTeam : 
              activeTab === 'members' ? handleCreateUser : 
              handleSendInvitation
            }
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            {activeTab === 'teams' ? 'Create Team' : 
             activeTab === 'members' ? 'Add Member' : 
             'Send Invitation'}
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
        <button
          onClick={() => setActiveTab('invitations')}
          className={`pb-2 px-1 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'invitations'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Invitations ({invitations.length})
        </button>
      </div>

      {/* Search */}
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
                      .filter(user => user.teamId === team.id)
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
      ) : activeTab === 'members' ? (
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
      ) : (
        /* Invitations Tab */
        <div className="space-y-6">
          {/* Waiting List - Accepted Invitations */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Waiting List ({acceptedInvitations.length})
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Users who accepted invitations and are waiting to be assigned to teams
              </p>
            </div>
            <div className="p-6">
              {acceptedInvitations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {acceptedInvitations.map((invitation) => (
                    <div
                      key={invitation.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {invitation.email.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {invitation.email}
                            </p>
                            <p className="text-xs text-gray-500">
                              Invited by {getInviterName(invitation.invitedBy)}
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(invitation.status)}
                      </div>
                      
                      <div className="mb-3">
                        {getRoleBadge(invitation.role)}
                      </div>
                      
                      {invitation.message && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          "{invitation.message}"
                        </p>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <select
                          onChange={(e) => handleAssignToTeam(invitation.id, e.target.value)}
                          className="flex-1 text-xs px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          defaultValue=""
                        >
                          <option value="">Assign to team...</option>
                          {teams.map(team => (
                            <option key={team.id} value={team.id}>
                              {team.name}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleDeleteInvitation(invitation.id)}
                          className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <UserPlus className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No users in waiting list</p>
                </div>
              )}
            </div>
          </div>

          {/* Pending Invitations */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Send className="h-5 w-5" />
                Pending Invitations ({pendingInvitations.length})
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Invitations that have been sent but not yet responded to
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Invited By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Sent
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {pendingInvitations.map((invitation) => (
                    <tr key={invitation.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {invitation.email.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {invitation.email}
                            </div>
                            {invitation.message && (
                              <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                                {invitation.message}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getRoleBadge(invitation.role)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {getInviterName(invitation.invitedBy)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(invitation.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(invitation.invitedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDeleteInvitation(invitation.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {pendingInvitations.length === 0 && (
              <div className="text-center py-8">
                <Send className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No pending invitations</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty States */}
      {((activeTab === 'teams' && filteredTeams.length === 0) || 
        (activeTab === 'members' && filteredUsers.length === 0) ||
        (activeTab === 'invitations' && filteredInvitations.length === 0)) && (
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
              : `Get started by ${
                  activeTab === 'teams' ? 'creating your first team' : 
                  activeTab === 'members' ? 'adding your first team member' : 
                  'sending your first invitation'
                }`
            }
          </p>
          {!searchTerm && (
            <button
              onClick={
                activeTab === 'teams' ? handleCreateTeam : 
                activeTab === 'members' ? handleCreateUser : 
                handleSendInvitation
              }
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              {activeTab === 'teams' ? 'Create Team' : 
               activeTab === 'members' ? 'Add Member' : 
               'Send Invitation'}
            </button>
          )}
        </div>
      )}

      {/* Modals */}
      {activeModal === 'team-modal' && (
        <TeamModal
          teamId={selectedTeam}
          onClose={() => dispatch(setActiveModal(null))}
        />
      )}
      {activeModal === 'user-modal' && (
        <UserModal
          userId={selectedUser}
          onClose={() => dispatch(setActiveModal(null))}
        />
      )}
      {activeModal === 'invitation-modal' && (
        <InvitationModal
          onClose={() => dispatch(setActiveModal(null))}
        />
      )}
    </div>
  );
};