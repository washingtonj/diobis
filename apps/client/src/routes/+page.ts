import type { PageLoad } from './$types';

const MOCKED_DATA = [
  {
    id: 'HH322DF@11',
    title: "Software Engineer at Google",
    shortDescription: "Join Google's innovative team in London!",
    description: "We are looking for a talented Software Engineer to join our London office. You will have the opportunity to work on cutting-edge projects that are shaping the future of technology. If you're passionate about software development and want to be a part of a dynamic team, apply now!",
    tags: ["Software Engineering", "Google", "London", "Full-time", "Senior", "Innovation", "Cutting-edge"],
    createdAt: "2021-01-01T12:00:00.000Z",
    quantityOfComments: 12,
    quantityOfLikes: 32,
  },
  {
    id: 'HH322DF@12',
    title: "Frontend Developer at Facebook",
    shortDescription: "Exciting Frontend Developer role at Facebook in Menlo Park!",
    description: "Join the Facebook team in Menlo Park and help build the next generation of web and mobile applications! As a Frontend Developer, you'll have the opportunity to work on user interfaces that millions of people use every day. Apply now and be a part of our innovative projects.",
    tags: ["Frontend Development", "Facebook", "Menlo Park", "Full-time", "Senior", "UI/UX", "Innovation"],
    createdAt: "2021-01-02T12:00:00.000Z",
    quantityOfComments: 8,
    quantityOfLikes: 25,
  },
  {
    id: 'HH322DF@13',
    title: "Backend Developer at Amazon",
    shortDescription: "Join Amazon's Backend Development team in Seattle!",
    description: "Are you a talented Backend Developer looking to make an impact? Join our Seattle office and work on the core of Amazon's web services. We're looking for someone who is passionate about backend technologies and wants to be part of our dynamic team.",
    tags: ["Backend Development", "Amazon", "Seattle", "Full-time", "Senior", "Cloud Computing", "Innovation"],
    createdAt: "2021-01-03T12:00:00.000Z",
    quantityOfComments: 10,
    quantityOfLikes: 30,
  },
  {
    id: 'HH322DF@14',
    title: "Full Stack Developer at Microsoft",
    shortDescription: "Exciting Full Stack Developer opportunity at Microsoft!",
    description: "Join Microsoft's team in Redmond and work on our web and mobile applications. As a Full Stack Developer, you'll have the chance to work on a wide range of technologies and projects. If you're passionate about full-stack development, apply now!",
    tags: ["Full Stack Development", "Microsoft", "Redmond", "Full-time", "Senior", "Cloud Services", "Innovation"],
    createdAt: "2021-01-04T12:00:00.000Z",
    quantityOfComments: 15,
    quantityOfLikes: 40,
  },
  {
    id: 'HH322DF@15',
    title: "Data Scientist at Google",
    shortDescription: "Join Google's Data Science team in Mountain View!",
    description: "We're looking for a skilled Data Scientist to join our Mountain View office and work on cutting-edge machine learning algorithms. If you're passionate about data science and want to make a difference, apply now!",
    tags: ["Data Science", "Google", "Mountain View", "Full-time", "Senior", "Machine Learning", "Innovation"],
    createdAt: "2021-01-05T12:00:00.000Z",
    quantityOfComments: 20,
    quantityOfLikes: 50,
  },
  {
    id: 'HH322DF@16',
    title: "Software Engineer at Apple",
    shortDescription: "Exciting Software Engineer role at Apple in Cupertino!",
    description: "Join Apple's team in Cupertino and work on our web and mobile applications. As a Software Engineer, you'll have the opportunity to contribute to the development of iconic Apple products. Apply now and be a part of our innovation!",
    tags: ["Software Engineering", "Apple", "Cupertino", "Full-time", "Senior", "App Development", "Innovation"],
    createdAt: "2021-01-06T12:00:00.000Z",
    quantityOfComments: 18,
    quantityOfLikes: 45,
  },
  {
    id: 'HH322DF@17',
    title: "UI/UX Designer at Airbnb",
    shortDescription: "Join Airbnb's creative team in San Francisco!",
    description: "We're seeking a talented UI/UX Designer to join our San Francisco office and work on designing the user experience for our web and mobile applications. If you're passionate about creating beautiful and user-friendly interfaces, apply now!",
    tags: ["UI/UX Design", "Airbnb", "San Francisco", "Full-time", "Senior", "User Experience", "Innovation"],
    createdAt: "2021-01-07T12:00:00.000Z",
    quantityOfComments: 22,
    quantityOfLikes: 55,
  },
  {
    id: 'HH322DF@18',
    title: "Product Manager at Uber",
    shortDescription: "Exciting Product Manager opportunity at Uber in San Francisco!",
    description: "Join Uber's team in San Francisco and lead the development of our web and mobile applications. As a Product Manager, you'll have the chance to shape the future of transportation technology. Apply now and drive innovation!",
    tags: ["Product Management", "Uber", "San Francisco", "Full-time", "Senior", "Transportation", "Innovation"],
    createdAt: "2021-01-08T12:00:00.000Z",
    quantityOfComments: 25,
    quantityOfLikes: 60,
  },
  {
    id: 'HH322DF@19',
    title: "DevOps Engineer at Netflix",
    shortDescription: "Join Netflix's DevOps team in Los Gatos!",
    description: "Are you an experienced DevOps Engineer looking to work on cutting-edge web and mobile applications? Join our Los Gatos office and be a part of our dynamic team. If you're passionate about DevOps, apply now!",
    tags: ["DevOps", "Netflix", "Los Gatos", "Full-time", "Senior", "Cloud Infrastructure", "Innovation"],
    createdAt: "2021-01-09T12:00:00.000Z",
    quantityOfComments: 30,
    quantityOfLikes: 65,
  },
  {
    id: 'HH322DF@20',
    title: "Software Engineer at Tesla",
    shortDescription: "Exciting Software Engineer role at Tesla in Palo Alto!",
    description: "Join Tesla's team in Palo Alto and work on our web and mobile applications. As a Software Engineer, you'll have the opportunity to contribute to the development of cutting-edge electric vehicles and energy solutions. Apply now and be part of our sustainable future!",
    tags: ["Software Engineering", "Tesla", "Palo Alto", "Full-time", "Senior", "Electric Vehicles", "Innovation"],
    createdAt: "2021-01-10T12:00:00.000Z",
    quantityOfComments: 35,
    quantityOfLikes: 70,
  },
  {
    id: 'HH322DF@21',
    title: "Frontend Developer at Twitter",
    shortDescription: "Join Twitter's Frontend Development team in San Francisco!",
    description: "We're looking for a passionate Frontend Developer to join our San Francisco office and work on the Twitter web and mobile applications. If you're excited about creating engaging user interfaces, apply now!",
    tags: ["Frontend Development", "Twitter", "San Francisco", "Full-time", "Senior", "Social Media", "Innovation"],
    createdAt: "2021-01-11T12:00:00.000Z",
    quantityOfComments: 40,
    quantityOfLikes: 75,
  },
  {
    id: 'HH322DF@22',
    title: "Backend Developer at LinkedIn",
    shortDescription: "Exciting Backend Developer opportunity at LinkedIn in Sunnyvale!",
    description: "Join LinkedIn's team in Sunnyvale and work on our web and mobile applications. As a Backend Developer, you'll have the chance to enhance the professional networking experience for millions of users. Apply now and connect with innovation!",
    tags: ["Backend Development", "LinkedIn", "Sunnyvale", "Full-time", "Senior", "Networking", "Innovation"],
    createdAt: "2021-01-12T12:00:00.000Z",
    quantityOfComments: 45,
    quantityOfLikes: 80,
  },
  {
    id: 'HH322DF@23',
    title: "Full Stack Developer at IBM",
    shortDescription: "Join IBM's Full Stack Development team in Armonk!",
    description: "We're looking for a Full Stack Developer to join our Armonk office and work on IBM's web and mobile applications. As a Full Stack Developer, you'll have the opportunity to innovate and shape the future of technology. Apply now!",
    tags: ["Full Stack Development", "IBM", "Armonk", "Full-time", "Senior", "Innovation", "Technology"],
    createdAt: "2021-01-13T12:00:00.000Z",
    quantityOfComments: 50,
    quantityOfLikes: 85,
  },
  {
    id: 'HH322DF@24',
    title: "Data Scientist at Microsoft",
    shortDescription: "Join Microsoft's Data Science team in Redmond!",
    description: "Are you a skilled Data Scientist looking for exciting opportunities? Join our Redmond office and work on machine learning algorithms that power Microsoft's products. Apply now and be a part of our data-driven innovation!",
    tags: ["Data Science", "Microsoft", "Redmond", "Full-time", "Senior", "Machine Learning", "Innovation"],
    createdAt: "2021-01-14T12:00:00.000Z",
    quantityOfComments: 55,
    quantityOfLikes: 90,
  },
  {
    id: 'HH322DF@25',
    title: "Software Engineer at Amazon",
    shortDescription: "Exciting Software Engineer role at Amazon in Seattle!",
    description: "Join Amazon's team in Seattle and work on our web and mobile applications. As a Software Engineer, you'll have the opportunity to shape the future of e-commerce and cloud services. Apply now and innovate with us!",
    tags: ["Software Engineering", "Amazon", "Seattle", "Full-time", "Senior", "E-commerce", "Innovation"],
    createdAt: "2021-01-15T12:00:00.000Z",
    quantityOfComments: 60,
    quantityOfLikes: 95,
  },
];


function getData(): Promise<typeof MOCKED_DATA> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCKED_DATA);
    }, 1000);
  })
}


export const load: PageLoad = async () => {
  return {
    payload: getData,
  }
};