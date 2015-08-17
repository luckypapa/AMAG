var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;

var ThemeManager = new mui.Styles.ThemeManager().getCurrentTheme();

module.exports = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    var styles = {   
      label: {
        color: ThemeManager.palette.primary1Color,
      },
      demoStyle: {
        margin: '16px 32px 0px 32px'
      }
    };

    return (
        <div>
        <RaisedButton 
              className="sign-in" 
              label="Login with Facebook" 
              onTouchTap={this.handleClick}
              linkButton={true} 
              style={styles.demoStyle} 
              labelStyle={styles.label}/>
        </div>
      )
    },

    componentDidMount: function() {
      document.addEventListener("fbLogin", 
       function statusChangeCallback(e) {
          console.log('statusChangeCallback');
          console.log(e.detail.res);
          var response = e.detail.res;
          this.loginStatusCallback(e.detail.res)
        }.bind(this)
      );
    },

    loginStatusCallback: function(response) {
      console.log('loginStatusCallback');
      console.log(response);
      // The response object is returned with a status field that lets the
      // app know the current login status of the person.
      // Full docs on the response object can be found in the documentation
      // for FB.getLoginStatus().
      if (response.status === 'connected') {
        console.log('response.status is connected');
        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;
        console.log('uid is : ' + uid);
        console.log('accessToken is : ' + accessToken);

        // Logged into your app and Facebook.
        FB.api('/me', function(res) {
          console.log('Successful login for: ' + res.name);
          console.log(res);  
          this.context.router.transitionTo('feed');
        }.bind(this));

        FB.api(
        "/me/friends",
        function (response) {
          if (response && !response.error) {
            /* handle the result */
            console.log("friends list : ");
            console.log(response);
          }
        });

        FB.api(
        "/me/taggable_friends",
        function (response) {
          if (response && !response.error) {
            console.log("tag friends list : ");
            console.log(response);
          }
        });

        FB.api(
        "/me/friendlists",
        function (response) {
          if (response && !response.error) {
             console.log("all friends list : ");
            console.log(response);
          }
        });
      } else if (response.status === 'not_authorized') {
        console.log("the user is logged in to Facebook, but has not authenticated your app");
      } else {
        console.log("the user isn't logged in to Facebook. Go login");
      }
    },

    handleClick: function() {console.log('Welcome!  Fetching your information.... ');
      console.log('FB Login Click');
      var valueScope = this.props.scope || 'public_profile, email';
      FB.login(this.loginStatusCallback, { scope: valueScope });
    }
});
