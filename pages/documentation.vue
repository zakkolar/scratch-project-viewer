<template>
  <div>
    <h1 class="f1 tc">Documentation</h1>
    <p>This documentation can be used for advanced customization of project sharing URLs. If you'd like to generate a link automatically, go to the <nuxt-link to="/">home page</nuxt-link>.</p>

    <p>Scratch Project Viewer's customizations are all specified as parameters at the end of the viewer page URL. To add parameters, add a pound sign/hashtag (<code class="inline-code">#</code>) to the end of the URL. Add the name of the parameter, an equal sign, and the value of the parameter. To specify multiple parameters, put an ampersand (<code class="inline-code">&amp;</code>) before the name of the next parameter. See an example below:</p>

    <url-box><span class="gray">{{viewerUrl}}</span><b>#</b>param1=value1<b>&amp;</b>param2=value2</url-box>

    <p>At a minimum, you need to specify the project ID or the full project URL with the <code class="inline-code">project</code> parameter. If you're using the full URL, be sure to escape the non-URL-safe characters (see <a href="#escaping-characters">below</a>).</p>

    <url-box>{{viewerUrl}}#project=10128067</url-box>
    <p class="tc">or</p>
    <url-box>{{viewerUrl}}#project={{"https://scratch.mit.edu/projects/10128067" | urlSafe}}</url-box>

    <h2 id="escaping-characters">Escaping characters</h2>
    <p>Some characters are not allowed in URLs and may confuse the browser if they're there. For these characters, certain codes are used in their place. For example, a space is represented by the code <code class="inline-code">%20</code></p>
    <p>Microsoft Excel and Google Sheets both have a built in formula called <code class="inline-code">ENCODEURL()</code> to replace these characters automatically.</p>

    <h2 id="bulk-generating">Generating links in bulk</h2>
    <p>If you'd like to generate many links at once, you can use Google Sheets or Microsoft Excel to turn a list of normal Scratch Project URLs into Scratch Project Viewer URLs. The formula below would create a Scratch Project Viewer link to view the project specified in cell A2. You can update the formula as necessary. Remember to escape characters for parameters (see <a href="#escaping-characters">above</a>).</p>
    <url-box :copy="sheetsExample1">{{sheetsExample1}}</url-box>
    <p>You can specify as many parameters as you'd like (full list <a href="#parameters">below</a>). For example:</p>
    <url-box :copy="sheetsExample2">{{sheetsExample2}}</url-box>


    <h2 id="parameters">Parameters</h2>
    <table class="params-table">
      <thead>
        <tr>
          <th>
            Parameter
          </th>
          <th>Description</th>
          <th>
            Default
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="parameter in this.parameters">
          <td class="cell">
            {{parameter.name}}
            <span v-if="parameter.required" class="f6 dark-red i ma0">(required)</span>
          </td>
          <td class="cell">{{parameter.description}}</td>
          <td class="cell">
            <template v-if="parameter.default">
              {{parameter.default}}
            </template>
            <template v-else>
              <i>none</i>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
</template>
<script>
  import UrlBox from "../components/UrlBox";
  export default {
    components: {UrlBox},
    data(){
      return {
        baseUrl: process.env.baseUrl,
        parameters:[
          {
            name: 'project',
            required: true,
            description: `The URL or project ID of the project you'd like to share`,
            type: 'string'
          },
          {
            name: 'title',
            description: `The title at the top of the share page`,
            type: 'string'
          },
          {
            name: 'caption',
            description: `The description of the project you'd like to share, displayed below the embedded project`,
            type: 'string'
          },
          {
            name: 'width',
            description: `The width of the embedded project on the view page`,
            type: `number`,
            default: 480
          },
          {
            name: 'height',
            description: `The height of the embedded project on the view page`,
            type: `number`,
            default: 360
          },
          {
            name: 'ui',
            description: 'Whether the controls for the project (start/pause/stop) should be shown',
            type: `boolean`,
            default: `true`
          },
          {
            name: 'autoStart',
            description: `Whether the project should start automatically (triggers green flag click). If the project controls are hidden, autostart is always true no matter what is set here.`,
            type: `boolean`,
            default: `false`
          },
          {
            name: 'showDownload',
            description: `Whether the download button should be displayed on the sharing page.`,
            type: `boolean`,
            default: `false`
          },
          {
            name: `backgroundColor`,
            description: `The background color for the project sharing page. Can be hex value or HTML color name`,
            type: `string`,
            default: '#FFFFFF'
          },
          {
            name: `textColor`,
            description: `The text color for the project sharing page. Can be hex value or HTML color name`,
            type: `string`,
            default: '#000000'
          }
        ]
      }
    },
    computed:{
      viewerUrl(){
        return `${this.baseUrl}/view`;
      },
      sheetsExample1() {
        return`="${this.baseUrl}/view#project="&ENCODEURL(A2)`;
      },
      sheetsExample2() {
        return`="${this.baseUrl}/view#project="&ENCODEURL(A2)&"&title="&ENCODEURL("My Cool Project")`;
      }
    },
    filters:{
      urlSafe(input){
        return encodeURIComponent(input);
      }
    },
    head:{
      title: 'Documentation | Scratch Project Viewer'
    }
  }
</script>
<style lang="scss">
  @import "~tachyons-sass";
  .params-table{
    @extend .collapse;
    tbody tr{
      @extend .stripe-dark;
    }
    td{
      @extend .v-top, .pa1;
    }

  }

  .inline-code{
    @extend .pa1, .bg-light-gray;
  }

</style>
