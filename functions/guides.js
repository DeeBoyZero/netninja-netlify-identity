exports.handler = async (event, context) => {
  const guides = [
    { title: "Beat all Zelda Bosses Like a Boss", author: "Mario" },
    { title: "Mario Kart Shortcurts You never knew existed", author: "luidgi" },
    { title: "Ultimate Street Fighter Guide", author: "chun-li" },
  ];

  if (context.clientContext.user) {
    return {
      statusCode: 200,
      body: JSON.stringify(guides),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ msg: "You must be logged in to see this content" }),
  };
};
