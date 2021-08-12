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
                  <p className="text-sm truncate">{person.role}</p>
                {/* </a> */}
              </div>
            </div>

            <div className="flex-shrink-0 flex items-center z-10 space-x-2 sm:space-x-3">
              <a href={person.twitter_link} className="text-brand-gray-600 hover:text-brand-gray-300" target="_blank">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              {/* <a href="!#" className="text-brand-gray-600 hover:text-brand-gray-300">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                    clipRule="evenodd"
                  />
                </svg>
              </a> */}
            </div>

          </div>

        </div>
      ))}
    </div>
  )
}
