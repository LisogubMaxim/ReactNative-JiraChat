import axios from "axios";

const getUserProjects = async (cloudId, token) => {
  try {
    const response = await axios.get(`https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/project`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

const getProjectTasks = async (projectId, token, cloudId) => {
  try {
    const response = await axios.get(
      `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/search?jql=project=${projectId}&fields=attachment`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data.issues;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

const getTaskComments = async (taskId, token, cloudId) => {
  try {
    const response = await axios.get(`https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/issue/${taskId}/comment`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

const getJiraBaseUrl = async (cloudId, token) => {
  try {
    const response = await axios.get(`https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/serverInfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data.baseUrl;
  } catch (error) {
    console.error("Error fetching Jira base URL:", error.response?.data || error.message);
  }
};

const getTaskDetails = async (taskId, token, cloudId) => {
  try {
    const response = await axios.get(`https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/issue/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching task details:", error);
    return null;
  }
};

const getAllComments = async (cloudId, token) => {
  const commentsData = [];
  const projects = await getUserProjects(cloudId, token);
  const baseUrl = await getJiraBaseUrl(cloudId, token);

  for (const project of projects) {
    const tasks = await getProjectTasks(project.id, token, cloudId);

    for (const task of tasks) {
      const comments = await getTaskComments(task.id, token, cloudId);
      const taskDetails = await getTaskDetails(task.id, token, cloudId);

      const taskDescription = taskDetails.fields.description
        ? taskDetails.fields.description?.content[0].content[0].text
        : "No description";

      for (const comment of comments) {
        let attachments = [];

        task.fields.attachment.forEach((attachment) => {
          attachments.push({
            mimeType: attachment.mimeType,
            content: attachment.content,
          });
        });

        commentsData.push({
          projectName: project.name,
          userName: comment.author.displayName,
          cardName: task.key,
          description: taskDescription,
          commentText: comment.body.content[0]?.content[0]?.text || "",
          attachments: attachments,
          jiraLink: `${baseUrl}/browse/${task.key}`,
          created: comment.created,
        });
      }
    }
  }

  commentsData.sort((a, b) => new Date(a.created) - new Date(b.created));
  return commentsData;
};

export { getUserProjects, getProjectTasks, getTaskComments, getAllComments };
