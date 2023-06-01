export function searchTasks(
    data: any[],
    searchTerm: string,
    searchOption: string
  ) {
    if (!searchTerm) {
      return [];
    }
  
    const term = searchTerm.toLowerCase();
    const results: any[] = [];
  
    data.forEach((project) => {
      if (searchOption === 'id' && project.projectId.toString().includes(term)) {
        results.push(project);
      } else if (
        searchOption === 'taskId' &&
        project.taskId.toString().includes(term)
      ) {
        // Agrega el objeto de proyecto correspondiente al taskId
        results.push({ ...project, ...project.project });
      } else if (
        searchOption === 'projectName' &&
        project.project.name.toLowerCase().includes(term)
      ) {
        results.push(project);
      } else if (
        searchOption === 'taskDescription' &&
        project.taskDescription.toLowerCase().includes(term)
      ) {
        results.push(project);
      }
    });
  
    return results;
  }
  
