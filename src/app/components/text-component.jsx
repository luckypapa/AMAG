var React = require('react');
var {ClearFix, Mixins, SelectField, TextField, Styles} = require('material-ui');
var {Spacing, Typography, color} = Styles;

var TextComponent = React.createClass({

  getInitialState() {
    return {
      selectValue: undefined
    };
  },

  getStyles() {
    return {
      root: {
        paddingTop: Spacing.desktopKeylineIncrement
      },
      headline: {
        fontSize: '24px',
        lineHeight: '32px',
        paddingTop: '0px',
        marginBottom: '12px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightNormal,
        color: Typography.textDarkBlack
      },
      title: {
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightMedium,
        color: '#f00'//Typography.textDarkBlack
      },
      group: {
        width: '100%',
        float: 'left',
        marginBottom: 32
      },
      textfield: {
        marginTop: 24
      }
    };
  },

  render() {
    var styles = this.getStyles();
    var menuItems = [
      { payload: '1', text: 'Gossip' },
      { payload: '2', text: 'Love' },
      { payload: '3', text: 'Backbiting' },
      { payload: '4', text: 'Complain' },
    ];
    return (
      <div style={styles.root}>
        <ClearFix>
          <h2 style={styles.headline}>Share your secret story</h2>
          <TextField
            style={styles.textfield}
            hintText="Write secret story"
            multiLine={true} /><br/>
          <SelectField
            style={styles.textfield}
            value={this.state.selectValue}
            onChange={this._handleSelectValueChange.bind(null, 'selectValue')}
            hintText="Secret type"
            menuItems={menuItems} /><br/>
        </ClearFix>
      </div>
    );
  },

  _handleSelectValueChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  }
});

module.exports = TextComponent;
