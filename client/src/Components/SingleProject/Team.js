import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';

/* This example requires Tailwind CSS v2.0+ */

export default function Team() {

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  let imageUrl = null;

  return (
    <div className="p-4 sm:p-5 space-y-4">
      {project.projectData.member_list.map((person, index) => (
        imageUrl = isValid(person.avatar) ? person.avatar.url : `${config.bucket_url}/${config.common_image}`,

        <div
          key={index}
          className="relative rounded-lg bg-brand-gray-900 border border-brand-gray-800 px-4 md:px-6 py-5 shadow-sm"
        >
          <div className="w-full flex items-center justify-between">
            <div className="min-w-0 flex-1 flex items-center space-x-3">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={imageUrl} alt="" />
              </div>
              <div className="flex-1 min-w-0">
                {/* <a href="!#" className="focus:outline-none"> */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-brand-gray-300">{person.name}</p>
                  <p className="text-sm truncate">{person.position}</p>
                {/* </a> */}
              </div>
            </div>

            <div className="flex-shrink-0 flex items-center z-10 space-x-2 sm:space-x-3">
              {isValid(person.facebook_link) ?
                <a href={person.facebook_link} className="text-brand-gray-600 hover:text-brand-gray-300" target="_blank">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.258,4.458c0-0.144,0.02-0.455,0.06-0.931c0.043-0.477,0.223-0.976,0.546-1.5c0.32-0.522,0.839-0.991,1.561-1.406
                C11.144,0.208,12.183,0,13.539,0h3.82v4.163h-2.797c-0.277,0-0.535,0.104-0.768,0.309c-0.231,0.205-0.35,0.4-0.35,0.581v2.59h3.914
                c-0.041,0.507-0.086,1-0.138,1.476l-0.155,1.258c-0.062,0.425-0.125,0.819-0.187,1.182h-3.462v11.542H8.258V11.558H5.742V7.643
                h2.516V4.458z"/>
                  </svg>
                </a>
                :
                null
              }
              {isValid(person.twitter_link) ?
                <a href={`https://twitter.com/${person.twitter_link}`} className="text-brand-gray-600 hover:text-brand-gray-300" target="_blank">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path 
                      fillRule="evenodd"
                      d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" 
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                :
                null
              }
              {isValid(person.dribbble_link) ?
                <a href={person.dribbble_link} className="text-brand-gray-600 hover:text-brand-gray-300" target="_blank">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                :
                null
              }
              {isValid(person.instagram_link) ?
                <a href={person.instagram_link} className="text-brand-gray-600 hover:text-brand-gray-300" target="_blank">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                :
                null
              }
              {isValid(person.medium_link) ?
                <a href={person.medium_link} className="text-brand-gray-600 hover:text-brand-gray-300" target="_blank">
                  <span className="sr-only">Medium</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h6.958l5.378 11.795 4.728-11.795h6.633v.403l-1.916 1.837c-.165.126-.247.333-.213.538v13.498c-.034.204.048.411.213.537l1.871 1.837v.403h-9.412v-.403l1.939-1.882c.19-.19.19-.246.19-.537v-10.91l-5.389 13.688h-.728l-6.275-13.688v9.174c-.052.385.076.774.347 1.052l2.521 3.058v.404h-7.148v-.404l2.521-3.058c.27-.279.39-.67.325-1.052v-10.608z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                :
                null
              }
            </div>

          </div>

        </div>
      ))}
    </div>
  )
}
