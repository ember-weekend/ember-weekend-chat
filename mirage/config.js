import config from '../config/environment';
export default function() {
  this.urlPrefix = config.apiUrl;

  this.post('/sessions', function() {
    return {
      included: [{
        type: "users",
        id: "1",
        attributes: {
          username: "rondale-sc",
          name: "Jonathan"
        }
      }],
      data: {
        type: "sessions",
        relationships: {
          user: {
            data: {
              type: "users",
              id: "1"
            }
          }
        },
        id: "4",
        attributes: {
          token: "eSXjrKD5Szg25P5oAW4388Nq55T5E3ah"
        }
      }
    };
  });
}
