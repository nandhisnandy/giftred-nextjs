
import { Check, Crown, Zap, Star, ArrowRight } from 'lucide-react';
import { PrimaryButton } from '@/components/ui/primary-button';
import { SecondaryButton } from '@/components/ui/secondary-button';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out GiftRed',
    features: [
      'Use base templates',
      'GiftRed domain sharing',
      'Basic media uploads',
      '3 greetings per month',
      'Community support'
    ],
    limitations: [
      'GiftRed branding',
      'Limited templates',
      'Basic customization'
    ],
    button: 'Get Started',
    popular: false,
    icon: Zap
  },
  {
    name: 'Pro',
    price: '$5',
    period: 'per month',
    yearlyPrice: '$25',
    yearlyPeriod: 'per year',
    description: 'For creators who want more',
    features: [
      'All premium templates',
      'Custom domain support',
      'AI-generated media',
      'Unlimited greetings',
      'Advanced customization',
      'Analytics & insights',
      'Priority support',
      'Remove GiftRed branding'
    ],
    button: 'Start Pro Trial',
    popular: true,
    icon: Crown
  },
  {
    name: 'One-Time',
    price: '$9.99',
    period: 'per greeting',
    description: 'Perfect for special occasions',
    features: [
      'White-labeled greeting',
      'Full customization',
      'AI media generation',
      'Custom domain',
      'Premium support',
      'No time limits',
      'All premium features'
    ],
    button: 'Create Greeting',
    popular: false,
    icon: Star
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center bg-primary/10 rounded-full px-4 py-2 text-sm font-medium text-primary mb-6">
            <Crown className="h-4 w-4 mr-2" />
            <span>Simple, transparent pricing</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold font-quicksand text-gray-900 mb-4">
            Choose Your <span className="gradient-text">Perfect Plan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free and upgrade when you need more. No hidden fees, 
            cancel anytime. All plans include our core greeting creation tools.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`
                relative bg-white rounded-3xl shadow-sm transition-all duration-300 overflow-hidden animate-fade-in border
                ${plan.popular 
                  ? 'ring-2 ring-primary shadow-xl hover:shadow-2xl scale-105 border-primary/20' 
                  : 'hover:shadow-lg hover:scale-102 border-gray-100'
                }
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-occasion-valentine text-white text-center py-3 text-sm font-semibold">
                  ⭐ Most Popular Choice
                </div>
              )}

              <div className={`p-8 ${plan.popular ? 'pt-16' : ''}`}>
                {/* Plan Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl ${plan.popular ? 'bg-primary/10' : 'bg-gray-100'}`}>
                      <plan.icon className={`h-6 w-6 ${plan.popular ? 'text-primary' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-quicksand text-gray-900">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-gray-600">{plan.description}</p>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-8">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  {plan.yearlyPrice && (
                    <div className="mt-2 p-2 bg-green-50 rounded-lg">
                      <div className="text-sm text-green-700 font-medium">
                        💰 Save 58% yearly: {plan.yearlyPrice}/{plan.yearlyPeriod}
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                {plan.popular ? (
                  <PrimaryButton className="w-full mb-8 group" size="lg" glow>
                    {plan.button}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </PrimaryButton>
                ) : (
                  <SecondaryButton className="w-full mb-8" size="lg">
                    {plan.button}
                  </SecondaryButton>
                )}

                {/* Features */}
                <div className="space-y-4">
                  <div className="font-semibold text-gray-900 text-sm">What's included:</div>
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations && (
                    <>
                      <div className="font-semibold text-gray-900 text-sm mt-6">Limitations:</div>
                      {plan.limitations.map((limitation) => (
                        <div key={limitation} className="flex items-center space-x-3 opacity-60">
                          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                            <div className="h-0.5 w-3 bg-gray-400 rounded"></div>
                          </div>
                          <span className="text-gray-600 text-sm">{limitation}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
          <h3 className="text-3xl font-bold font-quicksand text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Can I upgrade or downgrade anytime?</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Yes! You can change your plan at any time. Upgrades take effect immediately, 
                and downgrades take effect at the next billing cycle.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">What happens to my greetings if I cancel?</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your greetings remain accessible forever. Only creation of new greetings 
                will be limited based on your current plan.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Do you offer refunds?</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                We offer a 30-day money-back guarantee for Pro subscriptions. 
                One-time greetings are non-refundable once delivered.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Is there a limit on greeting views?</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                No! Once created, your greetings can be viewed unlimited times 
                by as many people as you'd like to share them with.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
