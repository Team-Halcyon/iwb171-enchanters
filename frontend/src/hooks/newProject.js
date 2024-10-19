import { useState } from 'react';
import axios from 'axios';

export function useNewProject() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const newProject = async (request) => {
    setLoading(true);
    const options = {
      method: 'POST',
      data: request,
    };

    try {
      const response = await axios(`${apiUrl}/`, options);
      setProject(response.data); 
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return { project, loading, error, newProject };
}

export function useCreateProject() {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const fetchProject = async (request) => {
      setLoading(true);
      const options = {
        method: 'GET',
      };
  
      try {
        const response = await axios(`${apiUrl}/`, options);
        setProject(response.data); 
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
  
    return { project, loading, error, fetchProject };
  }
  