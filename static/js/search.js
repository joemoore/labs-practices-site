var searchresultscontainermain = document.getElementById(
  "search-results-container"
);
if (searchresultscontainermain != null) {
  var searchLinks = document.createElement("div");
  searchLinks.setAttribute("class", "search-links");
  searchresultscontainermain.appendChild(searchLinks);

  var searchresultscontainer = document.createElement("div");
  searchresultscontainer.setAttribute("class", "searchresultscontainer");
  searchresultscontainermain.appendChild(searchresultscontainer);

  var searchResults = document.createElement("div");
  searchResults.setAttribute("id", "searchResults");
  searchresultscontainer.appendChild(searchResults);

  var searchResultsMore = document.createElement("div");
  searchResultsMore.setAttribute("id", "searchResultsMore");
  searchresultscontainer.appendChild(searchResultsMore);

  var cssElm = document.createElement("link");
  cssElm.setAttribute("rel", "stylesheet");
  cssElm.setAttribute("media", "all");
  cssElm.setAttribute("type", "text/css");
  document.body.appendChild(cssElm);
}

var apiKey = "AIzaSyAOmLC2tdbeNETWdQGYEF16j8MeuZCIPW4";
var searchEngineID = "444c01bc8645f4cbc";
var searchResultsText = "Search results for ";

function getQueryStringValue(key) {
  return decodeURIComponent(
    window.location.search.replace(
      new RegExp(
        "^(?:.*[&\\?]" +
          encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") +
          "(?:\\=([^&]*))?)?.*$",
        "i"
      ),
      "$1"
    )
  );
}

var query = getQueryStringValue("q");

if (query) {
  if (getQueryStringValue("tbm")) {
    var tbm = "&tbm=" + getQueryStringValue("tbm");
    var tbmvalue = getQueryStringValue("tbm");
  } else {
    var tbm = "";
    var tbmvalue = "";
  }

  var start = getQueryStringValue("start");

  if (start === "1&" || document.URL.indexOf("start=") === -1) start = 1;

  document.getElementById("search-results-info").innerHTML =
    searchResultsText +
    '"' +
    query
      .replace(/\+/g, " ")
      .replace(/%3A/g, ":")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;") +
    '"';

  function hndlr(response) {
    if (response.items == null) {
      document.getElementById("searchResultsMore").innerHTML = "No Results";
      if (tbm) {
        window.location.href.replace(
          "search/?start=" + (start - 10) + "&q=" + query + tbm
        );
      } else {
        window.location.href.replace(
          "search/?start=" + (start - 10) + "&q=" + query
        );
      }
      return;
    }

    //Clear div
    document.getElementById("searchResults").innerHTML = "";

    for (var i = 0; i < response.items.length; i++) {
      var item = response.items[i];
      var content = "";

      content +=
        "<div class='gs-webResult gs-result'>" +
        "<table class='gsc-table-result'><tbody><tr>";

      //Link
      content +=
        "<td><a class='gs-title' href='" +
        item.link +
        "'>" +
        item.htmlTitle +
        "</a><br/>";

      //Description

      content +=
        item.htmlSnippet.replace(/\<br\>/g, " ") +
        "<div class='gs-bidi-page-align gs-visibleUrl gs-visibleUrl-long' dir='ltr' style='word-break:break-all;'>" +
        item.htmlFormattedUrl +
        "</div>" +
        "</td></tr></tbody></table></div>";

      document.getElementById("searchResults").innerHTML += content;
    }

    //Page Controls

    var totalPages = Math.ceil(response.searchInformation.totalResults / 10);
    if (totalPages > 1) {
      var currentPage = Math.floor(start / 10 + 1);

      var pageControls =
        "<div class='gsc-results'><div class='gsc-cursor-box gs-bidi-start-align' dir='ltr'><div class='gsc-cursor'>";

      //Page change controls, 10 max.

      for (var x = 1; x <= totalPages && x <= 10; x++) {
        pageControls += "<div class='gsc-cursor-page";

        if (x === currentPage) pageControls += " gsc-cursor-current-page";

        var pageLinkStart = x * 10 - 9;

        pageControls +=
          "'><a href='?start=" +
          pageLinkStart +
          "&q=" +
          query +
          tbm +
          "'>" +
          x +
          "</a></div>";
      }

      pageControls += "</div></div></div>";

      document.getElementById("searchResults").innerHTML += pageControls;
    }
  }

  function search(filter) {
    //Load the script src dynamically to load script with query to call.
    // DOM: Create the script element
    var jsElm = document.createElement("script");

    // set the type attribute
    jsElm.type = "application/javascript";

    // make the script element load file
    jsElm.src =
      "https://customsearch.googleapis.com/customsearch/v1?cx=" +
      searchEngineID +
      "&key=" +
      apiKey +
      "&q=" +
      query +
      "&filter=1" + // remove duplicates
      "&callback=hndlr" +
      filter;

    // finally insert the element to the body element in order to load the script
    document.body.appendChild(jsElm);
  }

  var allLink = document.createElement("div");
  allLink.setAttribute("id", "all-link");
  allLink.setAttribute("class", "gsc-tabHeader gsc-inline-block active-tab");
  searchLinks.appendChild(allLink);

  if (window.location.search.indexOf("tbm") > -1) {
    var elems = document.querySelectorAll(".active-tab");

    [].forEach.call(elems, function (el) {
      el.classList.remove("active-tab");
    });

    if (start) {
      var filterLink = window.location.search
        .replace(tbm, "")
        .replace(start, "1");
    } else {
      var filterLink = window.location.search.replace(tbm, "");
    }
  } else {
    if (start) {
      var filterLink = window.location.search.replace(start, "1");
    } else {
      var filterLink = window.location.search;
    }
  }

  // ------ FILTER LINKS ------

  // All Results
  var allText = document.createElement("span");
  allText.innerHTML = "All Results";
  allLink.appendChild(allText);

  allLink.onclick = allClick;

  function allClick() {
    window.location.search = filterLink;
  }

  // Practices Filter
  var practicesLink = document.createElement("div");
  practicesLink.setAttribute("id", "practices-link");
  practicesLink.setAttribute("class", "gsc-tabHeader gsc-inline-block");
  searchLinks.appendChild(practicesLink);

  var practicesText = document.createElement("span");
  practicesText.innerHTML = "Practices and Workshops";
  practicesLink.appendChild(practicesText);

  practicesLink.onclick = practicesClick;

  function practicesClick() {
    window.location.search = filterLink + "&tbm=practices";
  }

  // Learning Paths Filter
  var learningPathsLink = document.createElement("div");
  learningPathsLink.setAttribute("id", "learningPaths-link");
  learningPathsLink.setAttribute("class", "gsc-tabHeader gsc-inline-block");
  searchLinks.appendChild(learningPathsLink);

  var learningPathsText = document.createElement("span");
  learningPathsText.innerHTML = "Learning Paths";
  learningPathsLink.appendChild(learningPathsText);

  learningPathsLink.onclick = learningPathsClick;

  function learningPathsClick() {
    window.location.search = filterLink + "&tbm=learningpaths";
  }

  // Guide Filter
  var guideLink = document.createElement("div");
  guideLink.setAttribute("id", "guides-link");
  guideLink.setAttribute("class", "gsc-tabHeader gsc-inline-block");
  searchLinks.appendChild(guideLink);

  var guidesText = document.createElement("span");
  guidesText.innerHTML = "Guides";
  guideLink.appendChild(guidesText);

  guideLink.onclick = guideClick;

  function guideClick() {
    window.location.search = filterLink + "&tbm=guides";
  }

  // Filter results if one is selected
  https: if (window.location.search.indexOf("guides") > -1) {
    document.getElementById("guides-link").classList.add("active-tab");
    var guidesFilter =
      "&siteSearch=labspractices.com%2Fguides&siteSearchFilter=i";
    search(guidesFilter);
  } else if (window.location.search.indexOf("practices") > -1) {
    document.getElementById("practices-link").classList.add("active-tab");
    var practicesFilter =
      "&siteSearch=labspractices.com%2Fpractices&siteSearchFilter=i";
    search(practicesFilter);
  } else if (window.location.search.indexOf("learningpaths") > -1) {
    document.getElementById("learningPaths-link").classList.add("active-tab");
    var lpFilter =
      "&siteSearch=labspractices.com%2Flearningpaths&siteSearchFilter=i";
    search(lpFilter);
  } else {
    document.getElementById("all-link").classList.add("active-tab");
    var noFilter = "&siteSearch=labspractices.com";
    search(noFilter);
  }
} //end if query
