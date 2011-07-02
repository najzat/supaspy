require 'rubygems'
require 'sinatra'
require 'supaspy.rb'

require 'google_url_shortener'
Google::UrlShortener::Base.api_key = 'AIzaSyBYJ9FexCl15yW0Js-mB52NGfX5ixlLuAk'

use Rack::ShowExceptions

run Sinatra::Application

set :logging, true
set :dump_errors, true
set :show_exceptions, true


