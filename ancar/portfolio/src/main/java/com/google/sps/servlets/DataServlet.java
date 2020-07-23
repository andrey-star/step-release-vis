// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
      Query query = new Query("Comment");

      DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
      PreparedQuery results = datastore.prepare(query);

      List<String> comments = new ArrayList<>();
      List<String> commentsToPrint;

      for (Entity entity : results.asIterable()) {
        String comment = (String) entity.getProperty("comment");
        comments.add(comment);
      }

      String valueParameter = request.getParameter("value");
      int numberOfComments = Integer.parseInt(valueParameter);

      Gson gson = new Gson();

      if (comments.size() == 0) {
          response.setContentType("application/json");
          response.getWriter().println(gson.toJson(""));
          return ;
      }

    //If the user requests more comments than there are available, print all.
      if (comments.size() < numberOfComments) {
          response.setContentType("application/json");
          response.getWriter().println(gson.toJson(comments));
          return ;
      }

      commentsToPrint = comments.subList(0, numberOfComments);
      response.setContentType("application/json");
      response.getWriter().println(gson.toJson(commentsToPrint));
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException { 
       String newComment = request.getParameter("comment");

       Entity commentEntity = new Entity("Comment");
       commentEntity.setProperty("comment", newComment);

       DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
       datastore.put(commentEntity);

       response.sendRedirect("/index.html");
  }

  private String convertToJsonUsingGson(ArrayList<String> commentsList) {
    Gson gson = new Gson();
    String json = gson.toJson(commentsList);
    return json;
  }
}
