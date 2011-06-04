require 'sinatra'
require 'erb'
require 'dm_models.rb'

def spy_link(combined_keys)
  "http://#{request.host}#{request.port ? ":#{request.port}" : "" }/play/#{combined_keys}"
end


get '/' do
  erb :index
end

post '/create' do

  urlset = Urlset.new({
    :mail => params[:mail],
    :urls => params[:url]
  })

  urlset.save

  #urlset.send

  spy_link( urlset.combined_keys )

end

get '/play/:combined_keys' do
  if Urlset.find_by_combined_keys(params[:combined_keys]).nil?
    'key not found'
  end
  erb :play
end

get '/spy/:combined_keys' do
  @urlset = Urlset.find_by_combined_keys(params[:combined_keys])
  erb :spy, :layout => false
end

post '/spy/:combined_keys' do
  urlset = Urlset.find_by_combined_keys(params[:combined_keys])
  unless urlset.nil?
    if urlset.checks.count < 5
      check = urlset.checks.new({ :visited => params[:visited] })
      check.save
      check.send_mail
    end
  end
end

