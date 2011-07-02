require 'rubygems'
require 'sinatra'
require 'supaspy.rb'

use Rack::ShowExceptions

set :logging, true
set :dump_errors, true
set :show_exceptions, true

run Sinatra::Application
