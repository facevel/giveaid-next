export async function getStaticProps(context:any) {

    return {
      redirect: {
        destination: '/ngo/dashboard/requests/manage',
        permanent: true,
        // statusCode: 301
      },
    }
}

export default function Requests(props:any) {
  return (
    <div>
      <h1>This is the Request page</h1>
    </div>
  );
};
