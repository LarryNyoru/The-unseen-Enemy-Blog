import { IPostComments } from "@/types";
import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || "";

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2OTU4MTM4NDQsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2xnMGhmaTluN2ZqeDAxdW4za3FqMHg2Ny9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiY2VjOWI3MGYtOTJiMi00NDUwLTkwZTgtNjZlOTQ1MWNiNGIwIiwianRpIjoiY2xuMW5zMHBxMGRoaTAxdXM2eTBhYXYzOCJ9.k_su-Zz1NdZgjyR20TK74XzTBf5eeTgVx_-MyP8rM8v21UlIqFATaZVFwGyeOm8fwMiMPFP8asTwtWYFoXZh8dizhnsMidYx3leueWMyigpOY--3ctmBdIXpbXm2g2cAIx5tzsmGFC4hoH4LtsogYDCEog2RUaKI9my_TL35ifbuetfxYui5en_W56KX6oRe0InAXooYbxyhLG5Ta9zEZZ3S2S3F8xRmRnMS0svQM1sVmUeOxhPbNFNT7Bb5QLQUKOCDyuKGtP3kjDNtaPUbCtj_Es9VjhoZvKOVP8-_1atuKa1eOhYyDnZgdy9kNMd-FLiXBB4TJW_MVdZ-i1qR0ci4bAEKIPzHRdcGF97MKUwn82duhEMpJrEeyRowazzrIzjYfie6KJ1H8BgPf4Jx8zYlb7d25Ga-N_vlp0fLs52enZdq8IuJ0xsg9asfkdpjyVgbY9xxLqkADFcRblryVKU8s2Bt65VMptYZ8ReaOsPOg0LOG_i7tv4MStqxyZzhLZtpA6EAZU3S7wxGZnClxYu5rzun1juf2Zm5B-i7q1XoTOyS5l6b9NCHKzQbfiWc-2DPnlgf4ATs7d6qeGK73emd4Elo2sPGZP2hOPm1ZhVMHf2phRxMFYR85fGCodaReCPjaro3OgE-qehRzVZJ24D92SLQ-ZSg7NyIKMWsvmg";

export const postComments = async (formData: IPostComments) => {
  const { name, email, comment, slug } = formData;

  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  try {
    const result = await graphQLClient.request(query, {
      name,
      email,
      comment,
      slug,
    });

    return result;
  } catch (error) {
    console.log("there was an error ", error);
    throw error;
  }
};
