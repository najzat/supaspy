require 'data_mapper'
require 'json'
require 'ruby-debug'
require 'dm-timestamps'
require 'mail'

DataMapper.setup(:default, 'mysql://localhost/supaspy_dev')

class Urlset
  include DataMapper::Resource
  property :id        , Serial
  property :mail      , String  , :required => true
  property :urls      , Json    , :required => true
  property :microkey  , String  , :length => 10
  property :sent      , Boolean , :default => false
  property :created_at, DateTime

	has n, :checks

  before :create do
		charset  = %w{ 2 3 4 6 7 9 a c d e f g h j k l m n p q r t v w x y z}
    self.microkey = (0...9).map{ charset.to_a[rand(charset.size)] }.join
  end

  def combined_keys
    self.id.to_s(36) << ';' << self.microkey
  end

  def self.find_by_combined_keys(combined_keys)
    (id36,microkey) = combined_keys.split(';')
    Urlset.first(:id => id36.to_i(36), :microkey => microkey)
  end

  def send
  end

end


class Check
  include DataMapper::Resource
  property :id        , Serial
  property :visited   , String  , :required => true
  property :created_at, DateTime

	belongs_to :urlset

  def send_mail
    
    mail = Mail.new do
      from    'wrampix@gmail.com'
      to      'wrampix@gmail.com'
      subject 'kope lat dziadu'
      body    'speprzaj'
    end

    mail.deliver!
            
  end
end

