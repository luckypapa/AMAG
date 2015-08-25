var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var AppLeftNav = require('./app-left-nav.jsx');
var FullWidthSection = require('./full-width-section.jsx');
var mui = require('material-ui');

var Colors = mui.Styles.Colors;
var Typography = mui.Styles.Typography;
var ThemeManager = new mui.Styles.ThemeManager();

var { AppBar, AppCanvas, Menu, IconButton } = mui;

class Master extends React.Component {

  constructor() {
    super();
    this._onLeftIconButtonTouchTap = this._onLeftIconButtonTouchTap.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  }

  getStyles() {
    var darkWhite = Colors.darkWhite;
    return {
      root: {
        margin: '0px'
      },
      footer: {
        backgroundColor: Colors.grey900,
        textAlign: 'center'
      },
      a: {
        color: darkWhite
      },
      p: {
        margin: '0 auto',
        padding: '0',
        color: Colors.lightWhite,
        maxWidth: '335px'
      },
      iconButton: {
        color: darkWhite
      }
    };
  }

  componentDidMount() {
    document.addEventListener("fbLogin",
      function statusChangeCallback(e) {
        if (this.context.router.getCurrentPath() != "/home") {
          console.log('master fbLogin statusChangeCallback');
          console.log(e.detail.res);
          var response = e.detail.res;
          if (response.status == 'connected') {
            document.fblogin = "connected";
          } else if (response.status === 'not_authorized') {
            document.fblogin = "not_authorized";
            this.context.router.transitionTo('home');
          } else {
            document.fblogin = "not_logged";
            this.context.router.transitionTo('home');
          }
        }
      }.bind(this)
    );
  }

  render() {
    var styles = this.getStyles();
    var title =
      this.context.router.isActive('get-started') ? 'Get Started' :
      this.context.router.isActive('feed') ? 'Feed' :
      this.context.router.isActive('component') ? 'Component' :
      this.context.router.isActive('text-component') ? 'Text Component' :
      "";

    var rightButton = (
      <IconButton
        iconStyle={styles.iconButton}
        iconClassName="muidocs-icon-custom-github"
        linkButton={true} />
    );

    var githubButton = (
      <IconButton
        iconStyle={styles.iconButton}
        iconClassName="muidocs-icon-custom-github"
        linkButton={true} />
    );

    return (
      <AppCanvas style={styles.root}>

        <AppBar
          onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
          title={title}
          zDepth={0}
          iconElementRight={rightButton}/>

        <AppLeftNav ref="leftNav" />

        <RouteHandler />

        <FullWidthSection style={styles.footer}>
          <p style={styles.p}>
            Hide book was made by <a style={styles.a} href="https://github.com/luckypapa/AMAG/graphs/contributors">Big head brothers band</a>.
          </p>
        </FullWidthSection>

      </AppCanvas>
    );
  }

  _onLeftIconButtonTouchTap() {
    this.refs.leftNav.toggle();
  }
}

Master.contextTypes = {
  router: React.PropTypes.func
};

Master.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Master;
