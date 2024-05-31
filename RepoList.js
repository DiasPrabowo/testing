import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import  '../index.css';

const RepoList = () => {
  const [repos, setRepos] = useState([]);

  const fetchData = () => {
    Swal.fire({
      title: 'Submit your GitHub username',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: async (login) => {
        try {
          const githubUrl = `https://api.github.com/users/${login}`;
          const response = await fetch(githubUrl);
          if (!response.ok) {
            throw new Error(await response.json());
          }
          return response.json();
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      },
      allowOutsideClick: () =>!Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) { 
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url
        });
      }
    });
  };

  useEffect(() => {

  }, []);

  return (
    
    <div>
  
      <h1 className="text-2xl font-bold"><button onClick={fetchData}>Search GitHub Username</button></h1>
      {}
      <ul>
        {repos.map(repo => (
          <li key={repo.id}>
            <strong>{repo.name}</strong>: {repo.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;