var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var {MenuItem, LeftNav} = mui;
var {Colors, Spacing, Typography} = mui.Styles;

var ThemeManager = new mui.Styles.ThemeManager().getCurrentTheme();

var menuItems = [
    { route: 'get-started', text: 'Get Started' },
    { route: 'feed', text: 'Feed' },
    { route: 'component', text: 'Component' },
    { type: MenuItem.Types.SUBHEADER, text: 'Links' },
    { type: MenuItem.Types.LINK, payload: 'https://github.com/luckypapa/AMAG', text: 'Github' },
    { type: MenuItem.Types.LINK, payload: 'http://material-ui.com', text: 'Material-UI' },
    { type: MenuItem.Types.LINK, payload: 'http://facebook.github.io/react', text: 'React' }
  ];

class AppLeftNav extends React.Component {

  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this._getSelectedIndex = this._getSelectedIndex.bind(this);
    this._onLeftNavChange = this._onLeftNavChange.bind(this);
    this._onHeaderClick = this._onHeaderClick.bind(this);
  }

  getStyles() {
    return {
      cursor: 'pointer',
      //.mui-font-style-headline
      fontSize: '24px',
      color: Typography.textFullWhite,
      lineHeight: Spacing.desktopKeylineIncrement + 'px',
      fontWeight: Typography.fontWeightLight,
      backgroundColor: ThemeManager.palette.primary1Color,
      paddingLeft: Spacing.desktopGutter,
      paddingTop: '0px',
      marginBottom: '8px'
    };
  }

  render() {
    var header = (
      <div style={this.getStyles()} onTouchTap={this._onHeaderClick}>
        Hide Book
      </div>
    );

    return (
      <LeftNav 
        ref="leftNav"
        docked={false}
        isInitiallyOpen={false}
        header={header}
        menuItems={menuItems}
        selectedIndex={this._getSelectedIndex()}
        onChange={this._onLeftNavChange} />
    );
  }

  toggle() {
    this.refs.leftNav.toggle();
  }

  _getSelectedIndex() {
    var currentItem;

    for (var i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
    }
  }

  _onLeftNavChange(e, key, payload) {
    this.context.router.transitionTo(payload.route);
  }

  _onHeaderClick() {
    this.context.router.transitionTo('root');
    this.refs.leftNav.close();
  }
}

AppLeftNav.contextTypes = {
  router: React.PropTypes.func
};

module.exports = AppLeftNav;
